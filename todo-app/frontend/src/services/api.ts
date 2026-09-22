import axios from "axios";
import type { Todo } from "../types/todo";

// In dev, Vite proxies /api -> http://localhost:4000 (see vite.config.ts).
// In production, set VITE_API_BASE_URL to the deployed API's origin.
const baseURL = `${import.meta.env.VITE_API_BASE_URL ?? ""}/api`;

const client = axios.create({ baseURL });

export const todosApi = {
  async list(): Promise<Todo[]> {
    const { data } = await client.get<Todo[]>("/todos");
    return data;
  },

  async create(title: string): Promise<Todo> {
    const { data } = await client.post<Todo>("/todos", { title });
    return data;
  },

  async update(id: number, changes: Partial<Pick<Todo, "title" | "is_done">>): Promise<Todo> {
    const { data } = await client.put<Todo>(`/todos/${id}`, changes);
    return data;
  },

  async remove(id: number): Promise<void> {
    await client.delete(`/todos/${id}`);
  },
};
