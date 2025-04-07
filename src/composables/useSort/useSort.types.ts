import type { ComputedRef, Ref } from 'vue';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  None = ''
}

export interface SortPair<T extends string> {
  field: T,
  direction: SortDirection,
}

export type UseSortDataType<T> = {
  [K in keyof T]: SortDirection
}

export interface UseSortReturnType<T> {
  sort: Ref<UseSortDataType<T>>
  query: ComputedRef<string[]>
}