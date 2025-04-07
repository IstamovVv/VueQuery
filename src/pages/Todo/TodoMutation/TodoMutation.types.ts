import type { DefaultError } from '@tanstack/query-core';
import { QueryClient, type UseMutationReturnType } from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';
import type { ComputedRef, Ref } from 'vue';

import type { Todo } from '@/pages/Todo/Todo.types.ts';

export type UseTodoMutationPageReturnType = Pick<UseTodoMutationReturnType, 'isPending'> & {
  inputText: Ref<string>
  fetchError: Ref<boolean>
  createTodo: () => void
  tableData: UseTodoMutationPageTableDataReturnType['data']
}

export type UseTodoMutationPageTableDataType = {
  label: string,
  value: unknown
}

export type UseTodoMutationPageTableDataReturnType = {
  data: ComputedRef<UseTodoMutationPageTableDataType[]>
}

export interface UseTodoMutationParameters {
  error: MaybeRef<boolean>
  client: QueryClient
}

export type UseTodoMutationReturnType = UseMutationReturnType<null, DefaultError, Todo, null>