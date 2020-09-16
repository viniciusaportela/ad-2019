# Back-End

# Instruções

Crie um arquivo `.env` e adicione as configurações neste, use o arquivo `.env.example` como base.

Se você for utilizar o Gmail, você **deve antes permitir aplicativos menos seguros**:

> https://myaccount.google.com/lesssecureapps?pli=1

Também é importante salientar que provavelmente não funcionará na primeira tentativa, pois o Google irá bloquear o pedido até você "reconhecer a atividade". Para deploy em ambientes remotos também é possível que ele peça que você permita o acesso na máquina remota

Se você for utilizar o Mailgun, insira os campos no `.env` e **NÃO INSIRA OS CAMPOS DO GMAIL**

Instale as dependências e rode o servidor usando o comando:

> npm install

> npm run start

# Estrutura de Arquivos (src/)

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

## `GET` /v1/people/

> Pega uma lista de usuários cadastrados

Exemplo de resposta:

```json
[
  {
    "_id": "5f61a00c52ccac087cf5bee9",
    "name": "Vinícius de Araújo Portela",
    "email": "example@gmail.com",
    "createdAt": "2020-09-16T05:18:04.350Z",
    "updatedAt": "2020-09-16T05:18:04.350Z",
    "__v": 0
  }
]
```

## `POST` /v1/people/

> Adiciona uma nova pessoa ao banco de dados

Exemplo de payload:

```json
[
  {
    "name": "Vinícius de Araújo Portela",
    "email": "example@gmail.com"
  }
]
```

Exemplo de resposta:

```json
[
  {
    "_id": "5f61a00c52ccac087cf5bee9",
    "name": "Vinícius de Araújo Portela",
    "email": "example@gmail.com",
    "createdAt": "2020-09-16T05:18:04.350Z",
    "updatedAt": "2020-09-16T05:18:04.350Z",
    "__v": 0
  }
]
```

## `PUT` /v1/people/:person

> Atualiza determinado usuário

Exemplo de payload:

```json
[
  {
    "name": "Vinícius de Araújo Portela",
    "email": "example2@gmail.com"
  }
]
```

## `DELETE` /v1/people/:person

> Remove determinada pessoa do banco de dados

Exemplo de requisição:

`DELETE http://localhost:8080/v1/people/5f61a00c52ccac087cf5bee9`

## `POST` /v1/people/send-to-all

> Manda um email com o seu respectivo amigo secreto para todos os emails cadastrados no banco de dados. Caso todos os email sejam enviados com sucesso, todas as pessoas são removidos automaticamente
>
> Note que para enviar corretamente os email, o sistema de ter pelo menos 2 pessoas cadastrados e um número par de pessoas, caso contrário retornará o erro "invalid_users_length"

## Error Codes

| Código               | Descrição                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| missing_field        | Algum campo está faltando no body ou query                                                                                                  |
| should_be_string     | Determinado campo deve ser uma string                                                                                                       |
| invalid_email        | O email enviado é inválido                                                                                                                  |
| not_found            | O recurso não foi encontrado                                                                                                                |
| already_exists       | O recurso já existe no banco de dados                                                                                                       |
| internal_error       | Um erro interno não esperado ocorreu                                                                                                        |
| invalid_users_length | A quantidade de pessoas cadastradas não satisfaz os requisitos para enviar emails: número de pessoas cadastradas deve ser maior que 2 e par |
