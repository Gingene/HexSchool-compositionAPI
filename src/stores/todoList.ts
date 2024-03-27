import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type Todo = {
  id: string;
  todoText: string;
  done: boolean;
};

type TodoList = Todo[];

type TodoListState = '' | 'update' | 'completed';

export const useTodoList = defineStore('todoList', () => {
  const todoList = ref<TodoList>([]);
  const localTodos: string = localStorage.getItem('hex-todo') ?? '[]';
  todoList.value = JSON.parse(localTodos);

  const isInputEmpty = ref(false);
  const todoListState = ref<TodoListState>('');

  const addTodo = (e: Event): void => {
    const form = e.target as HTMLFormElement;
    const inputValue = (form.todo as HTMLInputElement).value;
    if (!inputValue) {
      isInputEmpty.value = true;
      setTimeout(() => {
        isInputEmpty.value = false;
      }, 3000);
      return;
    }
    isInputEmpty.value = false;
    const todo: Todo = {
      id: self.crypto.randomUUID(),
      todoText: inputValue,
      done: false
    };
    todoList.value.push(todo);
    form.reset();
  };

  const deleteTodo = (id: string): void => {
    todoList.value = todoList.value.filter((todo) => todo.id !== id);
  };

  const clearCompletedTodos = (): void => {
    todoList.value = todoList.value.filter((todo) => todo.done === false);
  };

  const changeTodoListState = (state: TodoListState): void => {
    todoListState.value = state;
  };

  const filterTodoList = computed<TodoList>(() => {
    switch (todoListState.value) {
      case 'update':
        return todoList.value.filter((todo) => !todo.done);
      case 'completed':
        return todoList.value.filter((todo) => todo.done);
      default:
        return todoList.value;
    }
  });

  return {
    todoList,
    addTodo,
    deleteTodo,
    changeTodoListState,
    clearCompletedTodos,
    filterTodoList,
    isInputEmpty,
    todoListState
  };
});
