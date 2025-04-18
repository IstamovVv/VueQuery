import type { UrlParams } from '@vueuse/core';
import { computed } from 'vue';

import { useSearchParametersModel } from '@/composables/useSearchParametersModel/useSearchParametersModel.ts';
import type { UseSearchParametersModelDefinition, UseSearchParametersModelSupportedType } from '@/composables/useSearchParametersModel/useSearchParametersModel.types.ts';
import type { SortPair, UseSortDataType, UseSortReturnType } from '@/composables/useSort/useSort.types.ts';
import { SortDirection } from '@/composables/useSort/useSort.types.ts';
import { isObjectValue } from '@/utils';

export const useSort = <T extends {
  [K in keyof T]: UseSearchParametersModelSupportedType
}>(searchParameters: UrlParams, sortable: (keyof T)[]): UseSortReturnType<T> => {
  const { model } = useSearchParametersModel(searchParameters,
    sortable.reduce((accumulator, key) => {
      accumulator[key] = {
        default: SortDirection.None,
        validate: (value: SortDirection) => isObjectValue(SortDirection, value)
      }

      return accumulator
    }, {} as UseSearchParametersModelDefinition<UseSortDataType<T>>), { key: 's' })

  const query = computed<string[]>(() => {
    return Object.entries<SortDirection>(model.value)
      .filter(([_, direction]) => direction !== SortDirection.None)
      .map(([field, direction]) => stringifySortPair({ field, direction }))
  })

  return {
    sort: model,
    query,
  }
}

const stringifySortPair = (pair: SortPair<string>): string => {
  return `${pair.field}:${pair.direction}`
}