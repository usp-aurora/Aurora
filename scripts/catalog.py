"""Coleta do catálogo público do Júpiter e importação no MySQL do Aurora."""
import argparse
import asyncio
import os
import re

import aiohttp
from bs4 import BeautifulSoup
import pymysql

BASE_URL = 'https://uspdigital.usp.br/jupiterweb/'


def parse_subject(code, html):
    soup = BeautifulSoup(html, 'html5lib')
    text = soup.get_text(' ', strip=True)
    header = soup.find(string=re.compile(r'Disciplina:\s*' + re.escape(code)))
    credits = {}
    for label, field in [('Aula', 'lecture_credits'), ('Trabalho', 'work_credits')]:
        match = re.search(r'Créditos\s+' + label + r'\s*:?\s*(\d+)', text)
        if match:
            credits[field] = int(match.group(1))
    if not header or len(credits) != 2:
        raise ValueError(f'{code}: página sem nome ou créditos válidos; importação cancelada.')
    title = re.search(r'Disciplina:\s*' + re.escape(code) + r'\s*-\s*(.+)', str(header).strip())
    if not title:
        raise ValueError(f'{code}: título da disciplina inválido.')
    syllabus = None
    for cell in soup.find_all(['td', 'th']):
        if cell.get_text(' ', strip=True).rstrip(':') == 'Objetivos':
            row = cell.find_parent('tr')
            following = row.find_next_sibling('tr') if row else None
            if following:
                syllabus = following.get_text(' ', strip=True)
                break
    return dict(code=code, name=title.group(1).strip(), syllabus=syllabus, **credits)


async def collect(args):
    timeout = aiohttp.ClientTimeout(total=args.timeout)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        async def fetch(path):
            async with session.get(BASE_URL + path) as response:
                response.raise_for_status()
                return await response.text()

        codes = set(args.codes or [])
        if not codes:
            units = args.units
            if not units:
                soup = BeautifulSoup(await fetch('jupColegiadoLista?tipo=T'), 'html5lib')
                units = sorted(set(re.findall(r'codcg=(\d+)', str(soup))))
            for unit in units:
                soup = BeautifulSoup(await fetch('jupDisciplinaLista?letra=A-Z&tipo=T&codcg=' + unit), 'html5lib')
                for link in soup.find_all('a', href=re.compile('obterTurma')):
                    match = re.search(r'sgldis=([A-Z0-9]+)', link.get('href', ''))
                    if match:
                        codes.add(match.group(1))
        if not codes:
            raise ValueError('Nenhuma disciplina encontrada; catálogo existente preservado.')
        semaphore = asyncio.Semaphore(args.concurrency)
        async def subject(code):
            async with semaphore:
                return parse_subject(code, await fetch('obterDisciplina?print=true&sgldis=' + code))
        return await asyncio.gather(*(subject(code) for code in sorted(codes)))


def import_subjects(subjects):
    required = ['DB_HOST', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD']
    missing = [key for key in required if key not in os.environ]
    if missing:
        raise ValueError('Configure as variáveis de ambiente: ' + ', '.join(missing))
    connection = pymysql.connect(host=os.environ['DB_HOST'], port=int(os.getenv('DB_PORT', '3306')),
        user=os.environ['DB_USERNAME'], password=os.environ['DB_PASSWORD'],
        database=os.environ['DB_DATABASE'], charset='utf8mb4', connect_timeout=5)
    try:
        with connection.cursor() as cursor:
            cursor.executemany('''INSERT INTO subjects
                (code, name, syllabus, lecture_credits, work_credits, synced_at)
                VALUES (%(code)s, %(name)s, %(syllabus)s, %(lecture_credits)s, %(work_credits)s, UTC_TIMESTAMP())
                ON DUPLICATE KEY UPDATE name=VALUES(name), syllabus=VALUES(syllabus),
                lecture_credits=VALUES(lecture_credits), work_credits=VALUES(work_credits), synced_at=UTC_TIMESTAMP()''', subjects)
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--catalog-only', action='store_true', required=True)
    parser.add_argument('--mysql', action='store_true', required=True)
    parser.add_argument('--codes', nargs='+', help='Coletar somente estes códigos')
    parser.add_argument('-u', '--units', nargs='+', help='Códigos das unidades; padrão: todas')
    parser.add_argument('--timeout', type=int, default=20)
    parser.add_argument('--concurrency', type=int, default=3)
    args = parser.parse_args()
    if args.timeout < 1 or args.concurrency < 1:
        parser.error('timeout e concurrency devem ser positivos')
    subjects = asyncio.run(collect(args))
    import_subjects(subjects)
    print(f'{len(subjects)} disciplinas inseridas/atualizadas no MySQL.')
