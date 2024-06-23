
## prerequisitos
- Docker
- TMDB Bearer Token

## como iniciar o projeto:
- Copie o conteúdo da ".env.example" para uma ".env", insira a chave do tmb
- `git clone https://github.com/matheushb/movie-list-api.git`
- `cd movie-list-api`
- `npm i`
- `docker-compose up -d`
- `npx prisma migrate dev`

iniciar aplicação:
- npm run start
- npm run cluster

rodar os testes

- npm run test

autocannon

- npm run autocannon

Se tiver problemas para conseguir a chave da api, me envie mensagem no numero 44991332003, por favor.

utilize a rota seed para povoar o banco.


Autenticação
- A autenticação é feita por JWT Bearer token, que deve ser enviado no header em todas as requisições, menos POST /user e POST /auth/signin.

Authorization: Bearer {bearerToken}

