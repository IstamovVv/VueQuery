import type { Ref } from 'vue';

import type { TableFiltersDefinition } from '@/pages/Table/Table.types.ts';

export interface UseTableFiltersReturnType {
  apply: () => void,
  reset: () => void
  search: Ref<string>
  model: Ref<TableFiltersDefinition>
}

export interface TableFiltersEmits {
  reset: void
}