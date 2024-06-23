
## Pré-Requisitos
- Docker
- Node
- npm
- **TMDB Bearer Token** para seedar

## Sumário
1. [Startup](/clonando-a-aplicação)
2. [Startup](clonando-a-aplicação)
2. 
3. 
4. 

---
## Clonando a aplicação:
- `git clone https://github.com/matheushb/movie-list-api.git`
- `cd movie-list-api`

## Configurando a aplicação:
- Copie o conteúdo da **_.env.example_** para uma **_.env_**, insira a env **TMDB_API_KEY**
- `npm i`
- `docker-compose up -d`
- `npx prisma migrate dev`

## Iniciando a aplicação:
- `npm run start`
- `npm run cluster`

---

## Autenticação
- A autenticação é feita por **JWT Bearer Token**, que deve ser enviado no header em todas as requisições, exceto **POST /user** e **POST /auth/signin**
- ```Authorization: Bearer {bearerToken}```

## Seedando a aplicação
- Necessário a env **TMDB_API_KEY**
- GET /seed

## Swagger
- O **Swagger** está na rota **GET /api**.

## Rodar os testes
- `npm run test`

## Rodar o autocannon
- `npm run autocannon`

## Ajuda 
Se tiver problemas para conseguir o **TMDB_API_KEY**, me envie mensagem no número **44991332003**.



