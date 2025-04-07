import { Todo, UseTodoStateReturnType } from './todo.types';

const todos: Todo[] = [{
  text: 'do something 1',
}, {
  text: 'do something 1',
}]

export const useTodoState = (): UseTodoStateReturnType => {
  return { todos }
}