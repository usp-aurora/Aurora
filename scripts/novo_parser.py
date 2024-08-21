import os
import subprocess
import shutil
import json

# CONFIGURAÇÕES DO PROGRAMA
# Nome do diretório que contém as matérias resgatadas
temp = "temp"
dir = "db"

# Verifica se o diretório de dados existe
if not os.path.isdir( dir ):
    # Se não existe, cria
    os.mkdir( dir )

# Verifica se o diretório temporário existe
if not os.path.isdir( temp ):
    # Se não existe, cria
    os.mkdir( temp )

# O diretório principal, o diretório do semestre e o diretório dos logs existem, falta executar os scripts
# subprocess.run([ "python", "parse_cursos_usp.py", temp ])
subprocess.run([ "python", "parse_usp.py", temp ])

# Após a coleta de dados, começa a organização
soma = 0
i = 0
for arq in os.listdir(temp):
    if arq[-5:] == ".json" and len(arq) == 12:
        with open(f"{temp}/{arq}") as f:
            materia = json.load(f)
            data = materia["turmas"][0]["inicio"]
            soma += int( data[-4:] + data[-6] )
            i += 1

media = int(soma / i)

if media % 10 < 7:
    media = media - (media % 10) + 1
else:
    media = media - (media % 10) + 2

final = f"{dir}/{media}"
if not os.path.isdir( final ):
    # Se não existe, cria
    os.mkdir( final )

for arq in os.listdir( temp ):
    shutil.move( f"{temp}/{arq}", final )

os.rmdir( temp )