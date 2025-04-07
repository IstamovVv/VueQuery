import { computed } from 'vue';

import { DEFAULT_PAGE, DEFAULT_TOTAL } from '@/composables/usePagination/usePagination.constants.ts';
import type { UsePaginationData, UsePaginationReturnType } from '@/composables/usePagination/usePagination.types.ts';
import { useQueryModel } from '@/composables/useQueryModel/useQueryModel.ts';

export const usePagination = (limit: number): UsePaginationReturnType => {
  const data = useQueryModel<UsePaginationData>({
    page: {
      default: DEFAULT_PAGE,
      validate: (value: number) => value >= 1
    },
    total: {
      default: DEFAULT_TOTAL,
      validate: (value: number) => value >= 0,
    }
  }, { key: 'p' })

  const page = computed<number>({
    get: () => data.value.page,
    set: (value: number) => data.value.page = value
  })

  const total = computed<number>({
    get: () => data.value.total,
    set: (value: number) => data.value.total = value
  })

  const offset = computed<number>(() => (data.value.page-1) * limit)

  return {
    page,
    total,
    offset,
  }
}