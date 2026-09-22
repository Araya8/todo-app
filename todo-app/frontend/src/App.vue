<script setup lang="ts">
import { onMounted } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import { useTodos } from "./composables/useTodos";

const {
  todos,
  isLoading,
  error,
  remainingCount,
  progress,
  fetchTodos,
  addTodo,
  toggleDone,
  removeTodo,
} = useTodos();

onMounted(fetchTodos);
</script>

<template>
  <main class="mx-auto min-h-full max-w-xl px-5 py-10 sm:py-16">
    <header class="mb-8">
      <p class="font-body text-sm text-ink-soft">{{ new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' }) }}</p>
      <h1 class="font-display text-4xl font-medium text-ink sm:text-5xl">รายการที่ต้องทำ</h1>
      <p class="mt-2 text-ink-soft">
        <span v-if="todos.length === 0">เริ่มต้นวันของคุณด้วยรายการแรก</span>
        <span v-else>เหลืออีก {{ remainingCount }} จาก {{ todos.length }} รายการ</span>
      </p>
    </header>

    <TodoInput @add="addTodo" />

    <div class="mt-6 h-1 w-full overflow-hidden rounded-full bg-paper-line">
      <div
        class="h-full rounded-full bg-gold transition-all duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <p v-if="error" class="mt-4 rounded-lg bg-clay/10 px-4 py-3 text-sm text-clay">
      {{ error }}
    </p>

    <section class="mt-4">
      <TodoList
        :todos="todos"
        :is-loading="isLoading"
        @toggle="toggleDone"
        @remove="removeTodo"
      />
    </section>
  </main>
</template>
