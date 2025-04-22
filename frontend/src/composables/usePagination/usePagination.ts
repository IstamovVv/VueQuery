import { useRouteQuery } from '@vueuse/router';
import { computed } from 'vue';

import { DEFAULT_PAGE, DEFAULT_TOTAL } from '@/composables/usePagination/usePagination.constants.ts';
import type { UsePaginationReturnType } from '@/composables/usePagination/usePagination.types.ts';

export const usePagination = (limit: number): UsePaginationReturnType => {
  const page = useRouteQuery('page', DEFAULT_PAGE, { transform: Number })
  const total = useRouteQuery('total', DEFAULT_TOTAL, { transform: Number })
  const offset = computed<number>(() => (page.value-1) * limit)

  return {
    page,
    total,
    offset,
  }
}