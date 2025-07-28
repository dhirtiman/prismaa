# Todo App Backend

A simple backend for a Todo application built with **TypeScript**, **Express**, **Prisma**, **PostgreSQL**, and **Zod**.

## Features

- User registration and authentication
- Create, update, and manage todos
- Input validation with Zod
- RESTful API structure

## Tech Stack

- **TypeScript** — Strongly typed JavaScript
- **Express** — Web framework for Node.js
- **Prisma** — Next-generation ORM for Node.js & TypeScript
- **PostgreSQL** — Relational database
- **Zod** — TypeScript-first schema validation

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/todo-app-backend.git
   cd todo-app-backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up your environment variables:**
   - Copy `.env.example` to `.env` and fill in your database credentials.

4. **Run database migrations:**
   ```bash
   pnpm exec prisma migrate dev
   ```

5. **Start the server:**
   ```bash
   pnpm start
   ```

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/users` — Register a new user
- `POST /api/login` — User login
- `GET /api/todos` — Get user's todos
- `POST /api/todos` — Create a new todo

## License

MIT