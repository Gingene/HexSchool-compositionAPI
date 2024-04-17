<script setup lang="ts">
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoList } from '@/stores';
import { X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

import { ContenteditableItem } from '@/components/custom';

const { todoList, filterTodoList, todoListState } = storeToRefs(useTodoList());
const { deleteTodo, clearCompletedTodos } = useTodoList();

watchEffect(() => {
  localStorage.setItem('hex-todo', JSON.stringify(todoList.value));
});
</script>

<template>
  <ul class="space-y-4">
    <li
      v-for="todo in filterTodoList"
      :key="todo.id"
      class="flex items-center justify-between space-x-2"
    >
      <input type="checkbox" v-model="todo.done" class="size-6" />

      <ContenteditableItem class="w-full" tag="div" v-model="todo.todoText"></ContenteditableItem>

      <Button @click="deleteTodo(todo.id)" variant="ghost">
        <X />
      </Button>
    </li>
  </ul>
  <div class="flex justify-between flex-wrap">
    <span
      >{{
        todoListState === 'update' ? '未完成' : todoListState === 'completed' ? '已完成' : '全部'
      }}
      {{ filterTodoList.length }}個項目</span
    >
    <span v-if="todoListState !== 'update'">
      <Button @click="clearCompletedTodos"> 清除已完成項目 </Button>
    </span>
  </div>
</template>
