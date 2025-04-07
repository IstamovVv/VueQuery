import type { Ref } from 'vue';

import type { TableFiltersDefinition } from '@/pages/Table/Table.types.ts';

export interface UseTableFiltersReturnType {
  apply: () => void,
  search: Ref<string>
  model: Ref<TableFiltersDefinition>
}