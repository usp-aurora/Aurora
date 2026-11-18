# Installation
0. Install Python.
1. `python3 -m venv .venv` create a Python virtual environment;
2. `source ./.venv/bin/activate` source Activate the virtual environment (on Linux);
3. `pip install -r requeriments.txt` install libraries.
4. `python3 novo_parser.py` run the scrapping script.
# Catálogo de disciplinas no MySQL

Execute primeiro `php artisan migrate` no Laravel para criar `subjects`.
Instale as dependências com `pip install -r scripts/requirements.txt` em um
ambiente virtual Python 3.12. Exporte `DB_HOST`, `DB_PORT` (padrão 3306),
`DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD` no ambiente do processo.
O script não carrega `.env` automaticamente.

```sh
python scripts/parse_usp.py --catalog-only --mysql --codes MAC0110 MAT2453
python scripts/parse_usp.py --catalog-only --mysql -u 45
```

Sem `--codes` ou `-u`, coleta todas as unidades. Comece com poucos códigos.
O modo catálogo consulta somente os detalhes das disciplinas, sem turmas,
professores ou vagas. Não exige diretório de saída e não gera JSON.
Nome e créditos são obrigatórios; objetivos ausentes são armazenados como NULL.
Uma falha HTTP ou de validação cancela a importação inteira. A escrita usa uma
transação e atualiza registros pelo código; registros antigos não são removidos.
O MySQL precisa estar acessível a partir do processo Python e a tabela precisa
ter sido criada pelas migrations do Aurora. Nunca versione credenciais.

Testes: `python -m unittest discover -s scripts -p test_catalog.py`.
O modo original de JSON continua disponível sem `--catalog-only`.
A leitura do catálogo pelo aplicativo ainda precisa ser integrada.
