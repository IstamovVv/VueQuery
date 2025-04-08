import { watchDebounced } from '@vueuse/core';
import { type EmitFn, type ModelRef, ref, watch } from 'vue';

import type { TableFiltersDefinition } from '@/pages/Table/Table.types.ts';
import type { TableFiltersEmits, UseTableFiltersReturnType } from '@/pages/Table/TableFilters/TableFilters.types.ts';

export const useTableFilters = (
  model: ModelRef<TableFiltersDefinition>,
  emit: EmitFn<TableFiltersEmits>
): UseTableFiltersReturnType => {
  const modelProxy = ref<TableFiltersDefinition>({ ...model.value })

  watch(model, m => {
    modelProxy.value = { ...m }
  }, { deep: true })

  const search = ref<string>('')

  watchDebounced(search, v => {
    model.value.search = v
  }, { debounce: 1000 })

  const apply = (): void => {
    model.value = { ...modelProxy.value }
  }

  const reset = (): void => {
    emit('reset')
  }

  return {
    apply,
    reset,
    search,
    model: modelProxy,
  }
}