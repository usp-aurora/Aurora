import unittest
from catalog import parse_subject

class CatalogTest(unittest.TestCase):
    def test_extracts_catalog_without_offerings(self):
        html = '''<table><tr><td>Disciplina: MAC0110 - Introdução à Computação</td></tr></table>
        <table><tr><td>Créditos Aula:</td><td>4</td></tr>
        <tr><td>Créditos Trabalho:</td><td>0</td></tr></table>
        <table><tr><td>Objetivos</td></tr><tr><td>Aprender programação.</td></tr></table>'''
        subject = parse_subject('MAC0110', html)
        self.assertEqual(subject['name'], 'Introdução à Computação')
        self.assertEqual(subject['lecture_credits'], 4)
        self.assertEqual(subject['work_credits'], 0)
        self.assertEqual(subject['syllabus'], 'Aprender programação.')

    def test_rejects_incomplete_pages(self):
        with self.assertRaises(ValueError):
            parse_subject('MAC0110', '<html>Serviço indisponível</html>')
