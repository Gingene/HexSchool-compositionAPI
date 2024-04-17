<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodoList } from '@/stores';
import { MessageCirclePlus } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const { addTodo } = useTodoList();
const { isInputEmpty } = storeToRefs(useTodoList());
const todoText = ref('');
</script>

<template>
  <div>
    <form @submit.prevent="(e) => addTodo(e)" class="flex justify-center">
      <div class="relative w-1/2">
        <Input
          class="border-white rounded-r-none input"
          v-model="todoText"
          placeholder="請輸入代辦事項"
          name="todo"
        />

        <div
          v-if="isInputEmpty"
          class="absolute bg-black left-1/2 -translate-x-1/2 p-4 rounded-lg text-center w-[200px] md:w-[400px]"
        >
          沒有輸入任何想做的事情
        </div>
      </div>
      <Button type="submit" class="rounded-l-none">
        <MessageCirclePlus />
      </Button>
    </form>
  </div>
</template>
