import type { DefaultError } from '@tanstack/query-core';
import { type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';
import { computed, ref, toValue } from 'vue';

import { api } from '@/api';
import { NAME_SUGGESTIONS_LIMIT, TABLE_KEY } from '@/pages/Table/Table.constants.ts';
import type {
  UseTableFiltersNameSelectReturnType,
  UseTableNameSuggestionsQueryReturnType
} from '@/pages/Table/TableFilters/TableFiltersNameSelect/TableFiltersNameSelect.types.ts';

export const useTableFiltersNameSelect = (): UseTableFiltersNameSelectReturnType => {
  const search = ref<string>('')
  
  const suggestionsQueryData = useTableNameSuggestionsQuery(search)

  const options = computed<string[]>(() => suggestionsQueryData.data.value?.pages.flat() ?? [])

  return {
    search,
    options,
    suggestionsQueryData
  }
}

export const useTableNameSuggestionsQuery = (search: MaybeRef<string>): UseTableNameSuggestionsQueryReturnType => {
  return useInfiniteQuery<string[], DefaultError, InfiniteData<string[]>, QueryKey, number>({
    queryKey: [TABLE_KEY, search],
    queryFn: async ({ signal, pageParam }) => {
      const parameters: any = {
        offset: pageParam,
        limit: NAME_SUGGESTIONS_LIMIT
      }

      const searchValue = toValue(search)

      if (search) {
        parameters.search = searchValue
      }

      const response = await api.get<string[]>('/api/v1/table/name/suggestions', {
        signal,
        params: parameters,
      })

      return response.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParameter) => {
      if (lastPage.length === 0) {
        return
      }

      return lastPageParameter + NAME_SUGGESTIONS_LIMIT
    }
  })
}