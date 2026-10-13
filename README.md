# Scholarly Task Manager

A classroom task board (React + Vite) with an Express + MySQL REST API in `backend/`.

## Frontend

```bash
npm install
npm run dev      # http://localhost:5173
```

Colours live in `src/index.css` as CSS variables (`--accent`, `--todo`, `--progress`, `--review`,
`--done`, subject and priority colours). Components read them through `--col`, `--card-accent`
and `--prio` so each column, card and badge picks up its own hue.

## Backend

```bash
cd backend
npm install
# 1. create the schema + sample rows (needs a local MySQL server)
npm run db:create
npm run db:seed
# 2. set DB_USER / DB_PASSWORD in backend/.env
npm run dev      # or: npm start  →  http://localhost:5000
```

From the repo root you can also use `npm run server` / `npm run server:start`.

### API

| Method | Route                     | Description                              |
| ------ | ------------------------- | ---------------------------------------- |
| GET    | `/api/health`             | Service ping                             |
| GET    | `/api/tasks`              | List tasks (`?subject=`, `?status=`, `?q=`) |
| GET    | `/api/tasks/:id`          | Single task with comments                |
| POST   | `/api/tasks`              | Create a task                            |
| PUT    | `/api/tasks/:id`          | Update a task (partial body ok)          |
| DELETE | `/api/tasks/:id`          | Delete a task (comments cascade)         |
| POST   | `/api/tasks/:id/comments` | Add a comment `{ text, author? }`        |

Files: `server.js` (app + middleware), `config/db.js` (mysql2 pool),
`routes/taskRoutes.js`, `controllers/taskController.js`, `sql/schema.sql`, `sql/seed.sql`.

---

# React + Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
