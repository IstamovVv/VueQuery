import { watchDebounced } from '@vueuse/core';
import { type ModelRef, ref, watch } from 'vue';

import type { TableFiltersDefinition } from '@/pages/Table/Table.types.ts';
import type { UseTableFiltersReturnType } from '@/pages/Table/TableFilters/TableFilters.types.ts';

export const useTableFilters = (model: ModelRef<TableFiltersDefinition>): UseTableFiltersReturnType => {
  const modelProxy = ref<TableFiltersDefinition>({ ...model.value })

  watch(model, m => {
    modelProxy.value = { ...m }
  })

  const search = ref<string>('')

  watchDebounced(search, v => {
    model.value.search = v
  }, { debounce: 1000 })

  const apply = (): void => {
    model.value = { ...modelProxy.value }
  }

  return {
    apply,
    search,
    model: modelProxy,
  }
}