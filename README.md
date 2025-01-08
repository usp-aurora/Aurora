# Stack
Utilizamos Laravel como fullstack e React (em conjunto com Inertia, para funcionar com Laravel) para criar as páginas do frontend.
O banco de dados do sistema utiliza MySQL, já o banco do Jupiter utiliza MS SQL.

# Instalação 
## Pré-requisitos
Para instalar o sistema na sua máquina local, você precisa as seguintes ferramentas instaladas:
- PHP >8.0 & <=8.3
- [Composer](https://getcomposer.org/download/)
- MySQL, instale e configure o um banco de dados vazio para o sistema. (No Linux, utilize o [MariaDB](https://mariadb.org/))

## Ativando bibliotecas do composer
Com o comando 
`php --ini`
encontre o arquivo de configuração do seu php.
Descomente (retirando o ';' ) ou adicione as seguintes extensões 

```
extension=curl
extension=iconv
extension=pdo_dblib;
extension=pdo_mysql;
extension=zip
extension=sqlsrv
extension=pdo_sqlsrv
```

Pode ser que você tenha que baixar algumas dessas bibliotecas no seu computador.

## Crie um banco de dados
No terminal digite os seguinte comandos:
```shell
#Loga no mariadb como admin
sudo mariadb 
# No mariadb, cria um database chamado aurora 
create database aurora; 
# Cria um usuário chamado aurora com a senha que você escolheu
`grant all privileges on aurora.* to 'aurora'@'localhost' identified by <sua senha aqui>;
# Recarrega todos os privilégios do banco de dados
flush privileges  
```

## Instalando o sistema em Laravel
Clone o arquivo para sua máquina:
`git clone https://github.com/usp-aurora/Aurora.git`

Copie o .env.example e crie um .env para configurar variáveis do seu sistema:
`cp .env.example .env`

Dentro do .env, edite as informações sobre o banco de dados editando as seguintes linhas
```shell
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=aurora 
DB_USERNAME=auroa
DB_PASSWORD=<sua senha>
``` 
Além disso, se você tiver acesso, adicione as credenciais do banco de dados replicado do Júpiter, substituindo as seguintes linhas
```shell
# Complete com os dados que você recebeu
JUPITER_DB_HOST=
JUPITER_DB_PORT=
JUPITER_DB_DATABASE=
JUPITER_DB_USERNAME=
JUPITER_DB_PASSWORD=
JUPITER_DB_TRUST_SERVER_CERTIFICATE=true
```

Por último, adicione as linhas para o funcionamento do login com a senha única USP
```shell
# Complete com os dados que você recebeu
SENHAUNICA_KEY=
SENHAUNICA_SECRET=
SENHAUNICA_CALLBACK_ID=
```

No .env, salvamos informações privadas, como senhas e chaves secretas. Por isso, o .gitignore garante que ele nunca é carregado para o repositório.

> Cuidado para não confundir o .env.example com o .env. O .env.example vai para o github, e portando nunca deve ter informações sensíveis.

Agora, para executar o sistema em Laravel, execute a seguinte sequência de comandos:
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
Provavelmente há algum problema na compatibilidade entre a versão dos seus programas. Garanta que o php está dentre as versões listadas. Além disso, verifique se você ativou em php.ini todas as bibliotecas necessárias, e se você tem elas baixadas.

## php artisan migrate não encontrou nenhuma migração
Possivelmente isso é um problema de localização dos arquivos. Verifique se os arquivos de migrations estão dentro da pasta `database/migrations` e se o Laravel tem acesso a eles. Se o nome de caminho para chegar até os arquivos de migrações conter caracteres especiais, como "[]", é possível que o Laravel não consiga identificá-lo.

## Não consigo rodar o composer
Pode ser que você não tenha adicionado ele ao PATH da sua máquina. Em sistemas operacionais baseados em Debian, verifique se o arquivo composer.phar está em `/usr/local/bin/composer`.

Também é possível rodar o composer a partir do caminho onde o script está instalado. Se ele estiver no diretório onde você está acessando, utilize `php composer.phar install`.