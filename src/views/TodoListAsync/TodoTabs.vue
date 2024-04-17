<script setup lang="ts">
import { useTodoList } from '@/stores';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TodoList from './TodoList.vue';

const { changeTodoListState } = useTodoList();
</script>

<template>
  <div class="mt-6">
    <Tabs default-value="all">
      <TabsList class="w-full">
        <TabsTrigger value="all" class="w-1/3" @click="changeTodoListState('')">
          未完成
        </TabsTrigger>
        <TabsTrigger value="todo" class="w-1/3" @click="changeTodoListState('update')">
          進行中
        </TabsTrigger>
        <TabsTrigger value="done" class="w-1/3" @click="changeTodoListState('completed')">
          已完成
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <TodoList />
      </TabsContent>
      <TabsContent value="todo">
        <TodoList />
      </TabsContent>
      <TabsContent value="done">
        <TodoList />
      </TabsContent>
    </Tabs>
  </div>
</template>
