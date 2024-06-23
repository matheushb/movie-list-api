
## Pré-Requisitos
- Docker
- Node
- npm
- **TMDB Bearer Token** para seedar

## Clonando a aplicação:
- `git clone https://github.com/matheushb/movie-list-api.git`
- `cd movie-list-api`
---

## Sumário
1. [Configuração](#clonando-a-aplicação)
2. [Inicialização](#iniciando-a-aplicação)
3. [Entidades]()
4. [Seed](#seedando-a-aplicação)
5. [Swagger](#swagger)
6. [Ajuda](#ajuda)

---

## Configurando a aplicação:
- Copie o conteúdo da **_.env.example_** para uma **_.env_**, insira a env **TMDB_API_KEY**
- `npm i`
- `docker-compose up -d`
- `npx prisma migrate dev`
---
## Rodando a aplicação:
- `npm run start`
- `npm run cluster`

## Rodando os testes
- `npm run test`
- `npm run autocannon`
---
## Entidades

**User**
**Movie** 
**List**
**UserList**
**MovieList**

---

## Autenticação
- A autenticação é feita por **JWT Bearer Token**, que deve ser enviado no header em todas as requisições, exceto **POST /user** e **POST /auth/signin**
- Pelo swagger é apenas colar o token no **Authorize** (Canto superior direto)
- ```Authorization: Bearer {bearerToken}```

## Seedando a aplicação
- Necessário a env **TMDB_API_KEY**
- GET /seed

## Swagger
- O **Swagger** está na rota **GET /api**.


## Ajuda 
Se tiver problemas para conseguir o **TMDB_API_KEY**, [cadastre-se no site](https://developer.themoviedb.org/docs/getting-started) ou me contate no número **44991332003**.



