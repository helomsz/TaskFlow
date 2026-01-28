# 🧠 TaskFlow

Um **gerenciador de tarefas fullstack** no estilo **Kanban**, desenvolvido para estudo e prática de integração entre **frontend moderno** e **backend com API REST**, incluindo autenticação, CRUD completo e organização por status.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Lucide React](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)

<p align="left">
  <img src="https://github.com/helomsz/TaskFlow/blob/main/assets/taskflow.png" width="900"/>
</p>

---


## Visão Geral

O **TaskFlow** é uma aplicação **fullstack** que permite criar, organizar, atualizar e excluir tarefas de forma intuitiva, utilizando colunas de status (*To do*, *Em progresso* e *Concluídas*).

O projeto foi pensado para simular um fluxo real de aplicação, desde o backend com regras de negócio até o frontend com uma interface moderna e responsiva.

---

## Funcionalidades

- Autenticação de usuário (login/logout)
- Criação de tarefas
- Edição e atualização de status
- Exclusão de tarefas
- Visualização em formato Kanban
- Contadores por status (To do, Em progresso, Concluídas)
- Logout com redirecionamento

---

## 🏗️ Arquitetura do Projeto

Este é um projeto **FULLSTACK**, dividido em duas camadas principais:

### Backend
- API REST
- CRUD completo de tarefas
- Controle de status
- Autenticação
- Comunicação com o frontend via HTTP

### Frontend
- Dashboard com layout Kanban
- Sidebar de navegação
- Navbar flutuante
- Cards informativos por status
- Integração total com a API

---

## 📂 Estrutura Geral

```bash
taskflow/
├── backend/
│   ├── controllers
│   ├── routes
│   ├── middlewares
│   ├── repositories
│   ├── services
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── contexts
│   │   ├── pages
│   │   ├── routes
│   │   ├── styles
│   │   └── api
│   └── main.jsx
````

---

## ▶️ Como Executar o Projeto

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> Certifique-se de que o backend esteja rodando antes de iniciar o frontend.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido **exclusivamente para fins de estudo e prática**, com foco em:

* Arquitetura fullstack
* Integração frontend + backend
* Organização de código
* Boas práticas de componentização
* Consumo de API REST
* Experiência do usuário (UX)

---


## 👩‍💻 Desenvolvido por

**Heloisa Militão de Souza**
Projeto de estudo e portfólio!

