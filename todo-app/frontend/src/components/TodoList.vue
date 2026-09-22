<script setup lang="ts">
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem.vue";

defineProps<{ todos: Todo[]; isLoading: boolean }>();
const emit = defineEmits<{
  (e: "toggle", todo: Todo): void;
  (e: "remove", id: number): void;
}>();
</script>

<template>
  <div>
    <p v-if="isLoading" class="py-10 text-center text-ink-soft">กำลังโหลดรายการ...</p>

    <div v-else-if="todos.length === 0" class="py-14 text-center">
      <p class="font-display text-xl text-ink">ยังไม่มีรายการ</p>
      <p class="mt-1 text-ink-soft">เริ่มพิมพ์สิ่งที่ต้องทำด้านบนได้เลย</p>
    </div>

    <ul v-else>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="(t) => emit('toggle', t)"
        @remove="(id) => emit('remove', id)"
      />
    </ul>
  </div>
</template>
