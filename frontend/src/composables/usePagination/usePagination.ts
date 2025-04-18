import type { UrlParams } from '@vueuse/core';
import { computed } from 'vue';

import { DEFAULT_PAGE, DEFAULT_TOTAL } from '@/composables/usePagination/usePagination.constants.ts';
import type { UsePaginationData, UsePaginationReturnType } from '@/composables/usePagination/usePagination.types.ts';
import { useSearchParametersModel } from '@/composables/useSearchParametersModel/useSearchParametersModel.ts';

export const usePagination = (searchParameters: UrlParams, limit: number): UsePaginationReturnType => {
  const { model } = useSearchParametersModel<UsePaginationData>(searchParameters, {
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
    get: () => model.value.page,
    set: (value: number) => model.value.page = value
  })

  const total = computed<number>({
    get: () => model.value.total,
    set: (value: number) => model.value.total = value
  })

  const offset = computed<number>(() => (model.value.page-1) * limit)

  return {
    page,
    total,
    offset,
  }
}