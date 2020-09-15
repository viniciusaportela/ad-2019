# Back-End

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
