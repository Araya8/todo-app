import { Request, Response } from "express";
import { pool } from "../db/pool";
import { CreateTodoBody, UpdateTodoBody } from "../types";

// GET /api/todos - list all todos, newest first
export async function listTodos(_req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY created_at DESC, id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos." });
  }
}

// GET /api/todos/:id - fetch a single todo
export async function getTodo(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todo." });
  }
}

// POST /api/todos - create a new todo
export async function createTodo(req: Request, res: Response) {
  const { title } = req.body as CreateTodoBody;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo." });
  }
}

// PUT /api/todos/:id - update title and/or is_done
export async function updateTodo(req: Request, res: Response) {
  const { id } = req.params;
  const { title, is_done } = req.body as UpdateTodoBody;

  if (title === undefined && is_done === undefined) {
    return res
      .status(400)
      .json({ error: "Provide at least one of: title, is_done." });
  }

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({ error: "Title cannot be empty." });
  }

  try {
    const existing = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }

    const current = existing.rows[0];
    const newTitle = title !== undefined ? title.trim() : current.title;
    const newIsDone = is_done !== undefined ? is_done : current.is_done;

    const result = await pool.query(
      "UPDATE todos SET title = $1, is_done = $2 WHERE id = $3 RETURNING *",
      [newTitle, newIsDone, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo." });
  }
}

// DELETE /api/todos/:id
export async function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo." });
  }
}
