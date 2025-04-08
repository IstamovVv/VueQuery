import type { DefaultError } from '@tanstack/query-core';
import type { InfiniteData, UseInfiniteQueryReturnType } from '@tanstack/vue-query';
import type { ComputedRef, Ref } from 'vue';

export type UseTableNameSuggestionsQueryReturnType
  = UseInfiniteQueryReturnType<InfiniteData<string[]>, DefaultError>

export interface UseTableFiltersNameSelectReturnType {
  search: Ref<string>
  options: ComputedRef<string[]>
  suggestionsQueryData: UseTableNameSuggestionsQueryReturnType
}