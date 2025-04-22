import type { ComputedRef, Ref } from 'vue';

export interface UsePaginationData {
  page: number,
  total: number,
}

export interface UsePaginationReturnType {
  page: Ref<number>
  total: Ref<number>
  offset: ComputedRef<number>
}