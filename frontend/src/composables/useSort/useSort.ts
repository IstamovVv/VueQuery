import { useRouteQuery } from '@vueuse/router';
import { computed } from 'vue';

import type { SortModel, SortPair, UseSortReturnType } from '@/composables/useSort/useSort.types.ts';
import { SortDirection } from '@/composables/useSort/useSort.types.ts';

export const useSort = <T extends object>(sortable: (keyof T)[]): UseSortReturnType<T> => {
  const model = {} as SortModel<T>

  for (const key of sortable) {
    model[key] = useRouteQuery<SortDirection | undefined>(`sort:${String(key)}`)
  }

  const query = computed<string[]>(() => {
    const result = []

    for (const key of sortable) {
      if (model[key].value) {
        result.push(stringifySortPair({
          field: key as string,
          direction: model[key].value
        }))
      }
    }

    return result
  })

  return {
    model,
    query,
  }
}

const stringifySortPair = (pair: SortPair<string>): string => {
  return `${pair.field}:${pair.direction}`
}