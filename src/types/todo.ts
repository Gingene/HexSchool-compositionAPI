export type Todo = {
  id: string;
  todoText: string;
  done: boolean;
};

export type TodoList = Todo[];

export const todoListState = ['', 'update', 'completed'] as const;

export type TodoListStateType = (typeof todoListState)[number];

// export type TodoListState = '' | 'update' | 'completed';
