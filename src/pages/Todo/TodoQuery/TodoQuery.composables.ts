import { useQuery } from '@tanstack/vue-query';
import { computed, ref, toValue } from 'vue';

import { api } from '@/api';
import type { Todo } from '@/pages/Todo/Todo.types.ts';
import type {
  UseTodoQueryDependencies, UseTodoQueryPageReturnType,
  UseTodoQueryPageTableDataParameters, UseTodoQueryPageTableDataReturnType, UseTodoQueryPageTableDataType,
  UseTodoQueryReturnType
} from '@/pages/Todo/TodoQuery/TodoQuery.types.ts';

export const TODO_QUERY_KEY = 'todo'

export const useTodoQueryPage = (): UseTodoQueryPageReturnType => {
  const fetchError = ref<boolean>(false);
  const flagOne = ref<boolean>(false);
  const flagTwo = ref<boolean>(false);

  const query = useTodoQuery({
    error: fetchError,
    flagOne: flagOne,
    flagTwo: flagTwo,
  })

  const { data, error, isError, isPending } = query
  const { data: tableData } = useTodoQueryPageTableData(query)

  return {
    data,
    error,
    isError,
    isPending,
    tableData,
    flagOne,
    flagTwo,
    fetchError,
  }
}

export const useTodoQueryPageTableData =
  (parameters: UseTodoQueryPageTableDataParameters): UseTodoQueryPageTableDataReturnType => {
    const data = computed<UseTodoQueryPageTableDataType[]>(() => {
      const keys = Object.keys(parameters) as (keyof UseTodoQueryPageTableDataParameters)[]

      return keys.map<UseTodoQueryPageTableDataType>(key => ({
        label: key as string,
        value: String(parameters[key].value)
      }))
    })

    return {
      data
    }
  }

export const useTodoQuery = (deps: UseTodoQueryDependencies): UseTodoQueryReturnType => {
  return useQuery<Todo[]>({
    queryKey: [TODO_QUERY_KEY, ...Object.values(deps)],
    queryFn: async () => {
      const response = await api.get<Todo[]>('/api/v1/todo', {
        params: {
          flag1: toValue(deps.flagOne),
          flag2: toValue(deps.flagTwo),
          error: toValue(deps.error)
        }
      })

      return response.data
    },
  })
}