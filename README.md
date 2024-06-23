
## Pré-Requisitos
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [TMDB](https://developer.themoviedb.org/docs/getting-started) Token para seedar

## Clonando o Repositório:
```bash
git clone https://github.com/matheushb/movie-list-api.git
cd movie-list-api
```
---

## Sumário
1. [Configuração](#configurando-a-aplicação)
2. [Inicialização](#inicializando-a-aplicação)
3. [Entidades](#entidades)
4. [Seed](#seedando-a-aplicação)
5. [Swagger](#swagger)
6. [Ajuda](#ajuda)

---

## Configurando a aplicação:
1. Copie o conteúdo da **_.env.example_** para uma **_.env_**, insira a env **TMDB_API_KEY**
2. Instale as dependências: 
```bash 
npm install
```
3. Inicialize o container Docker:
```bash
docker-compose up -d
```
4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```
---
## Inicializando a aplicação:

Inicializando normalmente: 
```bash
npm run start
```
Inicializando em modo cluster:
```bash
npm run cluster
```

## Rodando os testes
Rodando testes: 
```bash
npm run test
```
Rodando teste de carga:
```bash
npm run autocannon
```

## Autenticação
- A autenticação é feita por **JWT Bearer Token**, que deve ser enviado no header em todas as requisições, exceto **POST /user** e **POST /auth/signin**
- Pelo swagger é apenas colar o token no **Authorize** (Canto superior direto)
```http
Authorization: "Bearer {bearerToken}"
```

## Seedando a aplicação
- Necessário a env **TMDB_API_KEY**
- Seed está na rota:
```http
GET /seed
```

## Swagger
- O **Swagger** está na rota:
```http
GET /api
```

---
## Entidades

[List](#list)
[Movie](#movie)
[MovieList](#movie-list)
[User](#user)
[UserList](#user-list)

---

### List

[List](#list) - Representa uma **lista de filmes** que podem ser **criadas pelos usuários**. As **listas** podem ser **públicas ou privadas** e **permitem avaliações** por parte dos **usuários**.

[Movie](#movie) - Representa um **filme**, contendo informações como título, sinopse, data de lançamento, idioma, gêneros e classificação. Os filmes podem ser **avaliados** e são **associados a listas de filmes**.

[MovieList](#movie-list) - Associa **filmes** a **listas** específicas, permitindo **agrupar filmes** em diferentes coleções **gerenciadas pelos usuários**.

[User](#user) - Representa um **usuário do sistema**, com informações como email, nome, gêneros e idiomas favoritos, biografia, data de nascimento, entre outras. Os usuários podem **criar listas de filmes** e **interagir com filmes através de avaliações e recomendações**.

[UserList](#user-list) - Associa **usuários** a **listas de filmes**, permitindo que um usuário **gerencie múltiplas listas de filmes**.

---

### Movie

**POST /movie**: Cria um novo filme.  
**GET /movie/top-rated**: Retorna os 10 filmes melhor avaliados.  
**GET /movie**: Retorna todos os filmes com filtros e paginação.  
**GET /movie/:id**: Retorna um filme específico pelo ID.  
**GET /movie/recommendations**: Retorna recomendações de filmes, baseadas no  usuário autenticado.  
**POST /movie/:id/rate**: Avalia um filme com uma nota entre 1 e 10.  
**PATCH /movie/:id**: Atualiza um filme pelo ID.  
**DELETE /movie/:id**: Remove um filme pelo ID.

---

### Movie List

**POST /movie-list**: Cria uma nova lista de filmes.  
**GET /movie-list**: Retorna todas as listas de filmes com paginação.  
**GET /movie-list/movie/:movieId/list/:listId**: Retorna uma lista de filmes específica por ID do filme e da lista.  
**PATCH /movie-list/movie/:movieId/list/:listId**: Atualiza uma lista de filmes específica.  
**DELETE /movie-list/movie/:movieId/list/:listId**: Remove uma lista de filmes específica.

---

### User

**POST /user**: Cria um novo usuário.  
**POST /user/add-favorite-genre**: Adiciona gêneros favoritos ao usuário autenticado.  
**POST /user/remove-favorite-genre**: Remove gêneros favoritos do usuário autenticado.  
**POST /user/add-favorite-language**: Adiciona idiomas favoritos ao usuário autenticado.  
**POST /user/remove-favorite-language**: Remove idiomas favoritos do usuário autenticado.  
**GET /user**: Retorna todos os usuários com filtros e paginação.  
**GET /user/:id**: Retorna um usuário específico pelo ID.  
**PATCH /user/:id**: Atualiza um usuário pelo ID.  
**DELETE /user/:id**: Remove um usuário pelo ID.

---

### User List

**POST /user-list**: Associa uma lista de filmes a um usuário.  
**GET /user-list**: Retorna todas as associações de listas de filmes com usuários, com paginação.  
**GET /user-list/user/:userId/list/:listId**: Retorna uma associação específica entre um usuário e uma lista de filmes, identificada pelos IDs do usuário e da lista.  
**PATCH /user-list/user/:userId/list/:listId**: Atualiza uma associação específica entre um usuário e uma lista de filmes.  
**DELETE /user-list/user/:userId/list/:listId**: Remove uma associação específica entre um usuário e uma lista de filmes.

---

## Ajuda 
Se tiver problemas para conseguir o **TMDB_API_KEY**, [cadastre-se no site](https://developer.themoviedb.org/docs/getting-started) ou me contate no número **[(44) 99133-2003](tel:+5544991332003)**.



