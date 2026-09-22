import { computed, ref } from "vue";
import type { Todo } from "../types/todo";
import { todosApi } from "../services/api";

export function useTodos() {
  const todos = ref<Todo[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const remainingCount = computed(
    () => todos.value.filter((t) => !t.is_done).length
  );
  const doneCount = computed(() => todos.value.filter((t) => t.is_done).length);
  const progress = computed(() =>
    todos.value.length === 0
      ? 0
      : Math.round((doneCount.value / todos.value.length) * 100)
  );

  async function fetchTodos() {
    isLoading.value = true;
    error.value = null;
    try {
      todos.value = await todosApi.list();
    } catch (e) {
      error.value = "ไม่สามารถโหลดรายการ todo ได้ กรุณาตรวจสอบว่า API server กำลังทำงานอยู่";
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function addTodo(title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;
    error.value = null;
    try {
      const created = await todosApi.create(trimmed);
      todos.value.unshift(created);
    } catch (e) {
      error.value = "เพิ่มรายการไม่สำเร็จ ลองใหม่อีกครั้ง";
      console.error(e);
    }
  }

  async function toggleDone(todo: Todo) {
    const previous = todo.is_done;
    todo.is_done = !todo.is_done; // optimistic update
    try {
      await todosApi.update(todo.id, { is_done: todo.is_done });
    } catch (e) {
      todo.is_done = previous; // rollback
      error.value = "อัปเดตสถานะไม่สำเร็จ ลองใหม่อีกครั้ง";
      console.error(e);
    }
  }

  async function removeTodo(id: number) {
    const idx = todos.value.findIndex((t) => t.id === id);
    if (idx === -1) return;
    const [removed] = todos.value.splice(idx, 1); // optimistic remove
    try {
      await todosApi.remove(id);
    } catch (e) {
      todos.value.splice(idx, 0, removed); // rollback
      error.value = "ลบรายการไม่สำเร็จ ลองใหม่อีกครั้ง";
      console.error(e);
    }
  }

  return {
    todos,
    isLoading,
    error,
    remainingCount,
    doneCount,
    progress,
    fetchTodos,
    addTodo,
    toggleDone,
    removeTodo,
  };
}
