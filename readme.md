# 🚀 Desafio: API de Gerenciamento de Tarefas Empresariais

## 📌 Sobre o Projeto

Este é um desafio prático inspirado em ferramentas como **Monday.com**,
pensado para treinar **Node.js, Fastify, TypeScript, Drizzle ORM,
PostgreSQL e Docker**, com autenticação JWT, criptografia de senhas com
Argon2, documentação via Swagger Scalar e testes automatizados com
Vitest + Supertest.

O sistema é voltado para empresas e suporta diferentes **roles**:
`admin`, `member` e `viewer`.

------------------------------------------------------------------------

## 🎯 Papéis do Sistema

-   **Admin (dono da empresa)**
    -   Pode criar usuários dentro da empresa.
    -   Pode criar, editar e excluir tarefas.
    -   Pode atribuir tarefas a membros.
    -   Pode visualizar todas as tarefas da empresa.
-   **Member (funcionário da empresa)**
    -   Pode visualizar todas as tarefas da empresa.
    -   Pode alterar o status **apenas das tarefas atribuídas a ele**.
    -   Não pode editar ou excluir tarefas de outros.
-   **Viewer (cliente/auditor/observador)**
    -   Pode visualizar todas as tarefas da empresa.
    -   Não pode criar, editar ou alterar tarefas.

------------------------------------------------------------------------

## ⚙️ Tecnologias Utilizadas

-   [Node.js](https://nodejs.org/)
-   [Fastify](https://fastify.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Drizzle ORM](https://orm.drizzle.team/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Docker](https://www.docker.com/)
-   [Swagger Scalar](https://swagger.io/tools/swagger-ui/)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   [argon2](https://www.npmjs.com/package/argon2)
-   [Vitest](https://vitest.dev/)
-   [Supertest](https://github.com/ladjs/supertest)

------------------------------------------------------------------------

## 🔐 Estrutura de Rotas

### **Auth**

-   `POST /register` → Admin cria usuários da empresa.
-   `POST /login` → autentica usuário e retorna JWT.

### **Tasks**

-   `POST /tasks` → Admin cria tarefa e atribui a membro.
-   `GET /tasks` → todos visualizam tarefas da empresa.
-   `PATCH /tasks/:id` → Admin edita; Member altera status se for
    responsável.
-   `DELETE /tasks/:id` → apenas Admin.

### **Company**

-   `GET /company/users` → Admin lista usuários da empresa.
-   `PATCH /company/users/:id` → Admin altera role.
-   `DELETE /company/users/:id` → Admin remove usuário.

------------------------------------------------------------------------

## 📦 Como Rodar o Projeto

### 1. Clone o repositório

``` bash
git clone https://github.com/seu-usuario/desafio-api-empresa.git
cd desafio-api-empresa
```

### 2. Suba o banco de dados com Docker

``` bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

``` env
DATABASE_URL=postgres://user:password@localhost:5432/desafio_empresa
JWT_SECRET=sua_chave_super_secreta
```

### 4. Instale as dependências

``` bash
npm install
```

### 5. Rode as migrations

``` bash
npm run migrate
```

### 6. Inicie a API

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🧪 Testes

Rodar todos os testes:

``` bash
npm run test
```

------------------------------------------------------------------------

## 📖 Documentação da API

Após iniciar o servidor, acesse:

    http://localhost:3333/docs

------------------------------------------------------------------------

Feito com 💻 por Kellton Hamaia 🚀
