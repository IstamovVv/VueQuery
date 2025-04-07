import type { ComputedRef, WritableComputedRef } from 'vue';

export interface UsePaginationData {
  page: number,
  total: number,
}

export interface UsePaginationReturn {
  page: WritableComputedRef<number>
  total: WritableComputedRef<number>
  offset: ComputedRef<number>
}