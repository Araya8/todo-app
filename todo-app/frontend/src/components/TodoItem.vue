<script setup lang="ts">
import type { Todo } from "../types/todo";

defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  (e: "toggle", todo: Todo): void;
  (e: "remove", id: number): void;
}>();
</script>

<template>
  <li
    class="group flex items-center gap-3 border-b border-paper-line py-3 last:border-b-0"
  >
    <input
      type="checkbox"
      class="check-circle"
      :checked="todo.is_done"
      :aria-label="`ทำเครื่องหมายว่า ${todo.is_done ? 'ยังไม่เสร็จ' : 'เสร็จแล้ว'}: ${todo.title}`"
      @change="emit('toggle', todo)"
    />
    <span
      class="flex-1 break-words text-[1.05rem] leading-snug transition-colors"
      :class="todo.is_done ? 'text-ink-soft line-through decoration-ink-soft/50' : 'text-ink'"
    >
      {{ todo.title }}
    </span>
    <button
      type="button"
      class="shrink-0 rounded-full px-2 py-1 text-sm text-ink-soft/70 transition-colors hover:text-clay"
      :aria-label="`ลบ: ${todo.title}`"
      @click="emit('remove', todo.id)"
    >
      ลบ
    </button>
  </li>
</template>
