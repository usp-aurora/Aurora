# Instalação 
## Pré-requisitos
Para instalar o sistema na sua máquina local, você precisa as seguintes ferramentas instaladas:
- PHP >8.0 & <8.3
- [Composer](https://getcomposer.org/download/)
- MySQL, instale e configure o um banco de dados vazio para o sistema. (No Linux, utilize o [MariaDB](https://mariadb.org/))

## Ativando bibliotecas do composer
Com o comando 
`php --ini`
encontre o arquivo de configuração do seu php.
Descomente as linhas (retirando o ';' ) 

```
extension=pdo_dblib;
extension=pdo_mysql;
```

Pode ser necessário baixar essas bibliotecas.

## Crie um banco de dados
Logue no Mariadb.
`sudo mariadb` 
`create database uspdex;` para criar um database chamado uspdex
`grant all privileges on uspdex.* to 'uspdex'@'localhost' identified by '1234';` para criar um usuário chamado "uspdex" com senha "1234" que tem todos os acesso ao database "uspdex".
`flush privileges` para recarregar os privilégios do banco de dados.

## Instalando o sistema em Laravel
Clone o arquivo para sua máquina:
`git clone https://github.com/ime-usp-br/requerimentos.git`

Copie o .env.example e crie um .env para configurar variáveis do seu sistema:
`cp .env.example .env`

Dentro do .env, edite as informações sobre o banco de dados em 
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=uspdex 
DB_USERNAME=uspdex
DB_PASSWORD=1234
``` 
Note que o .env é excluído do git pelo .gitignore, então nenhuma informação será pública.

Agora, execute a seguinte sequência de comandos:
`composer install` para insalar as bibliotecas do projeto
`php artisan key:generate` 
`php artisan migrate` para criar no banco de dados os datasets do projeto.
`php artisan db:seed` para carregar no banco os dados inicias.

## Instalando o frontend em React
Instale o [npm](https://www.npmjs.com/) na sua máquina. 
Na pasta do projeto, execute `npm i` para instalar as dependências do frontend.

## Rodando o sistema
Em dois terminais diferentes, execute:
`php artisan serve`
`npm run dev`

Agora, você deve conseguir acessar o sistema em localhost:8000 :)*

# Troubleshooting
## Tenho erros ao rodar composer install
Provavelmente há algum problema na compatibilidade entre a versão dos seus programas. Garanta que o php está dentre as versões listadas. Além disso, verifique se você ativiou em php.ini todas as bibliotecas necessárias, e se você tem elas baixadas.

## php artisan migrate não encontrou nenhuma migração
Possivelmente isso é um problema de localização dos arquivos. Verifique que os arquivos de migrations estão dentro da pasta `database/migrations` e que o Laravel tem acesso a eles. Se o nome de caminho para chegar até os arquivos de migrações conter carecteres especiais, como "[]", é possível que o Laravel não consiga identificá-lo.

## Não consigo rodar o composer
Pode ser que você não tenha adicionado ele ao PATH da sua máquina. Em sistemas opercionais baseados em Debian, verifique se o arquivo composer.phar está em `/usr/local/bin/composer`.

Também é possível rodar o composer a partir do caminho onde o script está instalado. Se ele estiver no diretório onde você está acessando, utilize `php composer.phar install`.
