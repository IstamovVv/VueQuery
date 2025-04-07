import type { DefaultError } from '@tanstack/query-core';
import {
  type InfiniteData,
  type UseInfiniteQueryReturnType, type UseQueryReturnType,
} from '@tanstack/vue-query';
import type { MaybeRef, Ref } from 'vue';

import type { UsePaginationReturnType } from '@/composables/usePagination/usePagination.types.ts';
import type { UseSortReturnType } from '@/composables/useSort/useSort.types.ts';
import type { ResponseWithTotal } from '@/types';

export interface TableRow {
  id: number
  name: string
  date: Date
  count: number
}

export interface TableFiltersDefinition {
  search: string
  idFrom: number
  idTo: number
  dateFrom: Date
  dateTo: Date
  name: string[]
}

export interface TableColumn {
  prop: keyof TableRow
  label: string
}

export interface UseTableGetQueryDependencies {
  offset: MaybeRef<number>
  limit: MaybeRef<number>
  sort: MaybeRef<string[]>
  filter: MaybeRef<TableFiltersDefinition>
}

export interface UseTablePageReturnType {
  columns: UseTableColumnsReturnType['columns']
  sortModel: UseSortReturnType<TableRow>
  filterModel: UseTableFiltersReturnType['filterModel']
  paginationModel: UsePaginationReturnType
  getTableQueryData: UseTableQueryReturnType
}

export type UseTableQueryReturnType = UseQueryReturnType<ResponseWithTotal<TableRow>, DefaultError>

export type UseTableNameSuggestionsQueryReturnType
  = UseInfiniteQueryReturnType<InfiniteData<string[]>, DefaultError>

export interface UseTableFiltersReturnType {
  filterModel: Ref<TableFiltersDefinition>
}

export interface UseTableColumnsReturnType {
  columns: TableColumn[]
}