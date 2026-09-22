<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "add", title: string): void;
}>();

const title = ref("");

function submit() {
  if (!title.value.trim()) return;
  emit("add", title.value);
  title.value = "";
}
</script>

<template>
  <form class="flex items-end gap-3" @submit.prevent="submit">
    <div class="flex-1">
      <label for="todo-title" class="sr-only">เพิ่มรายการใหม่</label>
      <input
        id="todo-title"
        v-model="title"
        type="text"
        placeholder="วันนี้ต้องทำอะไรบ้าง?"
        class="w-full border-0 border-b-2 border-paper-line bg-transparent py-2 text-lg text-ink placeholder:text-ink-soft/60 focus:border-moss focus:outline-none"
        maxlength="255"
        autocomplete="off"
      />
    </div>
    <button
      type="submit"
      class="shrink-0 rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-moss-dark disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="!title.trim()"
    >
      เพิ่ม
    </button>
  </form>
</template>
