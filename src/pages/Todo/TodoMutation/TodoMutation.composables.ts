import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed, ref, toValue } from 'vue';

import { api } from '@/api';
import { TODO_QUERY_KEY } from '@/pages/Todo/Todo.constants.ts';
import type { Todo } from '@/pages/Todo/Todo.types.ts';
import type {
  UseTodoMutationPageReturnType,
  UseTodoMutationPageTableDataReturnType, UseTodoMutationPageTableDataType,
  UseTodoMutationParameters,
  UseTodoMutationReturnType
} from '@/pages/Todo/TodoMutation/TodoMutation.types.ts';
import { showConfirmation, showWarningMessage } from '@/utils/popup';

export const useTodoMutationPage = (): UseTodoMutationPageReturnType => {
  const inputText = ref<string>('')
  const fetchError = ref<boolean>(false);

  const queryClient = useQueryClient()

  const query = useTodoMutation({
    error: fetchError,
    client: queryClient
  })
  
  const { isPending, mutate } = query
  const { data: tableData } = useTodoMutationPageTableData(query)

  const createTodo = (): void => {
    if (inputText.value === '') {
      showWarningMessage('Empty name')

      return
    }

    showConfirmation('Creating TODO', `Do you really want to create todo ${inputText.value}`).then(() => {
      mutate({ text: inputText.value })
    })
  }

  return {
    isPending,
    inputText,
    fetchError,
    createTodo,
    tableData,
  }
}

export const useTodoMutationPageTableData =
  (mutationData: UseTodoMutationReturnType): UseTodoMutationPageTableDataReturnType => {
    const data = computed<UseTodoMutationPageTableDataType[]>(() => {
      const keys = Object.keys(mutationData) as (keyof UseTodoMutationReturnType)[]

      return keys.map<UseTodoMutationPageTableDataType>(key => ({
        label: key as string,
        value: mutationData[key]
      }))
    })

    return {
      data
    }
  }

export const useTodoMutation = (parameters: UseTodoMutationParameters): UseTodoMutationReturnType => {
  return useMutation<null, DefaultError, Todo, null>({
    mutationFn: async (newTodo) => {
      return api.post('/api/v1/todo', undefined, {
        params: {
          text: newTodo.text,
          error: toValue(parameters.error),
        }
      })
    },
    onSuccess: () => {
      void parameters.client.invalidateQueries({ queryKey: [TODO_QUERY_KEY] })
    }
  })
}