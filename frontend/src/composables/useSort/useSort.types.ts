import type { ComputedRef, Ref } from 'vue';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface SortPair<T extends string> {
  field: T,
  direction: SortDirection,
}

export type SortModel<T> = {
  [K in keyof T]: Ref<SortDirection | undefined>
}

export interface UseSortReturnType<T> {
  model: SortModel<T>
  query: ComputedRef<string[]>
}