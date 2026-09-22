export interface Todo {
  id: number;
  title: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoBody {
  title: string;
}

export interface UpdateTodoBody {
  title?: string;
  is_done?: boolean;
}
