import type { MaybeRef } from 'vue';

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