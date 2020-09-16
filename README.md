# Secret Friend

Breve projeto para cadastrar uma lista de amigos e sortear o seu amigo secreto, construído com ReactJS (front) e NodeJS (backend).

![Preview do Projeto](preview.png)

Teste essa aplicação: [https://infinite-coast-25222.herokuapp.com/](https://infinite-coast-25222.herokuapp.com/)

# Instruções

As instruções específicas de cada parte (front e back) estão localizados no README das respectivas pastas.

# Heroku Deploy

O deploy para o heroku é **completamente opcional** (inclusive se for testar / avaliar, recomendo que siga as instruções de cada sub-projeto invés de realizar o deploy no heroku)

Os projetos front e back foram feitos para trabalharem individualmente usando a forma de deploy que for mais conveniente, para realizar o deploy para o heroku realize as seguintes instruções:

## 1. Adicione 2 ambientes de desenvolvimento

Essa etapa serve para conseguir usar as duas pastas (frontend e backend) em servidores do heroku diferentes.

> Veja: https://devcenter.heroku.com/articles/multiple-environments

Neste caso, os dois ambientes serão: _frontend_ e _backend_

`heroku create --remote frontend`

`heroku create --remote backend`

## 2. Deploy do Backend

Insira as variáveis de ambiente (pode ser pelo Heroku Dashboard também):

`heroku config:set MONGO_HOST=mongohosthere --remote backend`

`heroku config:set MONGO_DATABASE=mongodatabasehere --remote backend`

[...]

Repita para as todas as variáveis de ambiente (menos o PORT):

Para enviar os email, você tem 2 opções:

1. Gmail, recomendado para testar localmente + se tiver controle sobre a máquina que irá realizar o deploy

2. Mailgun, enviar mensagens pelo SMTP do Mailgun. se está for a opção escolhida, você **DEVE DEIXAR O CAMPO GMAIL_USERNAME E GMAIL_PASSWORD** em branco, ou o sistema irá enviar pelo Gmail como padrão.

Se você usar o Mailgun não insira as informações

Se você for usar o SMTP do Google note que é extremamente provável que ele bloqueie a primeira vez e seja necessário "permitir aplicativos menos seguros" e mudar a senha para conseguir usar no Heroku.

```
backend/.env.example

# MongoDB
MONGO_HOST=mongohosthere
MONGO_DATABASE=mongodatabasehere
MONGO_USER=mongouserhere
MONGO_PASSWORD=mongopasswordhere

# Gmail
GMAIL_USERNAME=gmailemailhere # Só insira se não for usar o mailgun
GMAIL_PASSWORD=gmailpasswordhere # Só insira se não for usar o mailgun

# MailGun
# Get on https://app.mailgun.com/app/account/security/api_keys
MAILGUN_API_KEY=maigunapikey-here

# Get on https://app.mailgun.com/app/sending/domains
MAILGUN_DOMAIN=sandbox.mailgun.org

MAILGUN_SENDER_EMAIL=example@gmail.com

# Server
PORT=8080 # NÃO INSIRA ESSE
```

Realize o deploy:

`git subtree push --prefix backend/ backend master`

## 3. Deploy Frontend

Insira a seguinte variável de ambiente do frontend (pode ser pelo Heroku Dashboard também):

`heroku config:set REACT_APP_API_SERVER=http://apiserveraddres --remote frontend`

Realize o deploy:

`git subtree push --prefix frontend/ frontend master`
