# API de Agenda de Contatos

---

![Portfolio](https://img.shields.io/badge/Atysonjaime-API_Agenda_de_Contatos-%23EA580C)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

> 📒 Bem-vindo ao repositório da API de Agenda de Contatos! Este projeto é uma introdução prática à construção de APIs utilizando Node.js e serve como um ponto de partida para futuras aplicações mais complexas.
>
> Este repositório foi criado com o objetivo de estudar e aplicar tecnologias essenciais para o desenvolvimento de APIs. Ele demonstra a implementação de operações CRUD (Criar, Ler, Atualizar e Deletar) em uma agenda de contatos.

## 📋 Sumário

- API de Agenda de Contatos
  - [📋 Sumário](#-sumário)
  - [💻 Tecnologias](#-tecnologias)
  - [🏗️ Build Setup](#️-build-setup)
  - [🚀 Rotas](#-rotas)
    - [Users](#users-users)
      - [Criação de usuário](#criação-de-usuário)
    - [Contacts](#contacts-contacts)
      - [Listagem de contatos](#listagem-de-contatos)
      - [Criação de contatos](#criação-de-contatos)
      - [Edição de contatos](#edição-de-contatos)
      - [Exclusão de contatos](#exclusão-de-contatos)
  - [📝 Licença](#-licença)

---

## 💻 Tecnologias

Esse projeto utiliza as seguinte tecnologias para o desenvolvimento:

| Back-end                        |
| ------------------------------- |
| [Node](https://nodejs.org/en)   |
| [Fastify](https://fastify.dev)  |
| [Prisma](https://www.prisma.io) |
| [Eslint](https://eslint.org)    |
| [Prettier](https://prettier.io) |

## 🏗️ Build Setup

> Primeiramente, abre seu melhor terminal e acesse a pasta ao qual você clonou o repositório.
>
> Ao fazer isso, rode o seguinte comando no terminal:

```sh
  npm install
```

> Após o install, necessário criar a migrate com o seguinte comando no terminal:

```sh
  npm prisma migrate dev
```

> Para finalizar, rode o seguinte comando no terminal:

```sh
  npm run dev
```

> Feito isso, em seu terminal você receberá o seguinte feedback:

```sh
  Server is running on port 3100
```

> Caso deseje visualizar seu banco, rode o seguinte comando:

```sh
  npm prisma studio
```

## 🚀 Rotas

> A API de Agenda de Contatos possui as seguintes rotas:

### Users: `/users`

#### Criação de usuário

- **Método:** `POST`;
- **Rota:** `/`;
- **Corpo da requisição:**
  - `name`: string;
  - `email`: string;
- **Resposta:**
  - `id`: string;
  - `name`: string;
  - `email`: string;

---

### Contacts: `/contacts`

#### Listagem de contatos

#### Criação de contatos

#### Edição de contatos

#### Exclusão de contatos

## 📝 Licença

[MIT License](https://github.com/AtysonJaime/api_with_node_fastify_prisma_typescript/blob/master/LICENSE) © [Atyson Jaime](https://atysonjaime.github.io)
