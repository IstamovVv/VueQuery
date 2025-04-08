import { useQuery } from '@tanstack/vue-query';
import { computed, ref, toValue } from 'vue';

import { api } from '@/api';
import { TODO_QUERY_KEY } from '@/pages/Todo/Todo.constants.ts';
import type { Todo } from '@/pages/Todo/Todo.types.ts';
import type {
  UseTodoQueryDependencies, UseTodoQueryPageReturnType,
  UseTodoQueryPageTableDataReturnType, UseTodoQueryPageTableDataType,
  UseTodoQueryReturnType
} from '@/pages/Todo/TodoQuery/TodoQuery.types.ts';

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
  (queryData: UseTodoQueryReturnType): UseTodoQueryPageTableDataReturnType => {
    const data = computed<UseTodoQueryPageTableDataType[]>(() => {
      const keys = Object.keys(queryData) as (keyof UseTodoQueryReturnType)[]

      return keys.map<UseTodoQueryPageTableDataType>(key => ({
        label: key as string,
        value: queryData[key]
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