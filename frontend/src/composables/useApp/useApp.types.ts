import type { ComputedRef } from 'vue';

export interface UseAppReturnType {
  authorized: ComputedRef<boolean>
  isLoading: ComputedRef<boolean>
  prefetch: () => Promise<void>
}