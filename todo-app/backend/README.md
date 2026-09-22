# Todo API Server

RESTful API for the Todo List application, built with **Express.js + TypeScript** on top of **PostgreSQL**.

## Endpoints

| Method | Path             | Description                          |
|--------|------------------|---------------------------------------|
| GET    | `/api/todos`     | List all todos                        |
| GET    | `/api/todos/:id` | Get a single todo                     |
| POST   | `/api/todos`     | Create a todo — body: `{ "title": string }` |
| PUT    | `/api/todos/:id` | Update a todo — body: `{ "title"?: string, "is_done"?: boolean }` |
| DELETE | `/api/todos/:id` | Delete a todo                         |
| GET    | `/health`        | Health check                          |

## Setup

### 1. Prerequisites
- Node.js 18+
- A running PostgreSQL server (local, Docker, or hosted)

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
# edit .env with your PostgreSQL credentials
```

### 4. Create the database
```bash
# using psql
createdb todo_app
```

### 5. Create the schema
Two options:
```bash
# Option A: via the provided npm script
npm run db:init

# Option B: run the SQL file directly
psql -U postgres -d todo_app -f src/db/schema.sql
```

### 6. Run the server
```bash
# development (auto-reload)
npm run dev

# production
npm run build
npm start
```

The API will be available at `http://localhost:4000`.

## Quick test
```bash
curl http://localhost:4000/health
curl -X POST http://localhost:4000/api/todos -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
curl http://localhost:4000/api/todos
```

## Project structure
```
backend/
├── src/
│   ├── db/
│   │   ├── pool.ts        # PostgreSQL connection pool
│   │   ├── schema.sql     # Table definition
│   │   └── init.ts        # Script to apply schema.sql
│   ├── controllers/
│   │   └── todosController.ts
│   ├── routes/
│   │   └── todos.ts
│   ├── types.ts
│   └── index.ts            # App entrypoint
├── .env.example
├── package.json
└── tsconfig.json
```
