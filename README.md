Claro! Vou ajustar o README para você, organizando a seção de passos 3, 4, 5 dentro da parte "Como Rodar Localmente" sem que precise usar #, deixando o texto limpo, com linhas de separação e indentação para facilitar a leitura.

Segue uma versão melhor formatada e “bonita” do seu README:

````markdown
# Challenge - Dev [FULLSTACK] - Organograma da Empresa

## Sobre o projeto

Este projeto consiste em uma aplicação monolítica com backend API REST em Ruby on Rails e frontend em React, que gerencia o organograma de empresas, colaboradores e suas relações hierárquicas.

O objetivo é implementar funcionalidades de cadastro, listagem, visualização e organização do organograma empresarial, respeitando regras de negócio como associação de gestores, pares e liderados diretos e indiretos.

---

## User Stories

### Epic: Empresa

- Como usuário, quero cadastrar uma empresa (atributo: `name`)
- Como usuário, quero listar as empresas do sistema
- Como usuário, quero ver uma empresa

### Epic: Colaboradores

- Como usuário, quero cadastrar um colaborador em uma empresa (`name`, `email`, `picture`)
- Como usuário, quero listar colaboradores de uma empresa
- Como usuário, quero apagar um colaborador

### Epic: Organograma

- Associar colaborador como gestor de outro, ambos na mesma empresa
- Cada colaborador pode ter no máximo um gestor
- Um gestor deve ter nível hierárquico superior ao subordinado (junior < pleno < senior)
- Evitar hierarquias cíclicas por meio da validação de níveis hierárquicos
- Listar pares de um colaborador (outros colaboradores com o mesmo gestor)
- Listar liderados diretos
- Listar liderados indiretos (segundo nível)

> **Nota:** A validação hierárquica assegura que um gestor deve ter nível superior ao subordinado, eliminando a necessidade de detectar ciclos explicitamente.

---

## Tecnologias usadas

- Backend: Ruby on Rails
- Banco de dados: PostgreSQL
- Frontend: React com Vite
- Gerenciamento de estado e dados: React Query
- Ícones: lucide-react

---

## Arquitetura e Boas Práticas

- Código em inglês 100%
- Componentização reutilizável no frontend
- Separação clara entre API e UI
- Tratamento de erros e loading states
- Validação e regras de negócio no backend
- Consultas otimizadas para hierarquia (SQL e ActiveRecord)
- Uso de hooks React para gerenciamento de estado local e global (React Query)
- Documentação básica e limpa no código

---

## Como Rodar Localmente / Run Locally

### 1. Pré-requisitos

- Ruby (3.0.3)
- Rails
- Node.js + npm
- PostgreSQL
### Pré-requisitos - Banco de Dados PostgreSQL

- Ter PostgreSQL instalado e rodando localmente.
- Certifique-se que existe o usuário `postgres` com a senha `uolProject`, ou ajuste `config/database.yml` para refletir seu usuário e senha local.
- Para criar/alterar o usuário no terminal do PostgreSQL:

```bash
sudo -u postgres psql

- Git



### 2. Clonar o repositório

```bash
git clone git@github.com:DaviGaldeano/org-chart-app.git
cd org-chart-app
````

---

### 3. Configurar o backend (Rails API)

```bash
cd backend
bundle install

# Configure o banco de dados no config/database.yml

rails db:create
rails db:migrate
rails db:seed
rails server
```

O backend estará disponível em: [http://localhost:3000](http://localhost:3000)

---

### 4. Configurar o frontend (React + Vite)

```bash
cd ../frontend
npm install
npm run dev

```
O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

---

### 5. Rodar testes

```bash
cd backend
bundle exec rspec
```
