import { computed } from 'vue';

import { useQueryModel } from '@/composables/useQueryModel/useQueryModel.ts';
import type { UseQueryModelDefinition, UseQueryModelSupportedType } from '@/composables/useQueryModel/useQueryModel.types.ts';
import type { SortPair, UseSortDataType } from '@/composables/useSort/useSort.types.ts';
import { SortDirection } from '@/composables/useSort/useSort.types.ts';
import { isObjectValue } from '@/utils';

export const useSort = <T extends {
  [K in keyof T]: UseQueryModelSupportedType
}>(sortable: (keyof T)[]) => {
  const data = useQueryModel(
    sortable.reduce((accumulator, key) => {
      accumulator[key] = {
        default: SortDirection.None,
        validate: (value: SortDirection) => isObjectValue(SortDirection, value)
      }

      return accumulator
    }, {} as UseQueryModelDefinition<UseSortDataType<T>>), { key: 's' })

  const query = computed<string[]>(() => {
    return Object.entries<SortDirection>(data.value)
      .filter(([_, direction]) => direction !== SortDirection.None)
      .map(([field, direction]) => stringifySortPair({ field, direction }))
  })

  return {
    data,
    query,
  }
}

const stringifySortPair = (pair: SortPair<string>): string => {
  return `${pair.field}:${pair.direction}`
}