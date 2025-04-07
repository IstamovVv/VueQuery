import type { DefaultError } from '@tanstack/query-core';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';
import type { ComputedRef, Ref } from 'vue';

import type { Todo } from '@/pages/Todo/Todo.types.ts';

export type UseTodoQueryPageReturnType = Pick<UseTodoQueryReturnType, 'data' | 'error' | 'isError' | 'isPending'> & {
  tableData: UseTodoQueryPageTableDataReturnType['data']
  flagOne: Ref<boolean>
  flagTwo: Ref<boolean>
  fetchError: Ref<boolean>
}

export interface UseTodoQueryDependencies {
  error: MaybeRef<boolean>
  flagOne: MaybeRef<boolean>
  flagTwo: MaybeRef<boolean>
}

export type UseTodoQueryReturnType = UseQueryReturnType<Todo[], DefaultError>

export type UseTodoQueryPageTableDataParameters = Pick<UseTodoQueryReturnType,
  'isPending' | 'isFetching' | 'isError' | 'error' | 'failureCount' | 'failureReason'>

export type UseTodoQueryPageTableDataType = {
  label: string,
  value: string,
}

export type UseTodoQueryPageTableDataReturnType = {
  data: ComputedRef<UseTodoQueryPageTableDataType[]>
}