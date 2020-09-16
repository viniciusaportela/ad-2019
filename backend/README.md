# Back-End

# Instruções

Crie um arquivo `.env` e adicione as configurações neste, use o arquivo `.env.example` como base. Utilizei o Gmail para o envio de emails, logo, se for também utilizar o Gmail para enviar mensagens, **você deve antes permitir acesso a app menos seguros:**

> https://myaccount.google.com/lesssecureapps?pli=1

Instale as dependências e rode o servidor usando o comando:

> npm run start

# Estrutura de Arquivos

O Back-End segue a seguinte estrutura de arquivos:

## Config

Carrega as credenciais salvas no `.env`, facilitando o acesso das informações do `.env`
(através do Intellisense do VSCode).

## Constants

Salvos todas as constantes do sistema, atualmente salva apenas as classes de **Erro**

## Controllers

Validação de Campos e uso dos Serviços

## Database/Model

Localização de todos as coleções do banco de dados MongoDB

## Middlewares

Salvo middlewares usados pelos Express:

| Middleware            | Descrição                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| handleErrors          | Pega todos os errors jogados pelo sistema e transforma em uma resposta para o usuário                                   |  |
| handleValidatorErrors | Trata todos os campos verificados pelo express-validator e se algum campo estiver inválido "jogar" um erro como retorno |

## Routes

Todas as rotas que direcionam Métodos POST, GET, PUT, DELETE, etc

Também tratam os `slugs`

## Services

Manipulação direta com o banco de dados

# API Reference
