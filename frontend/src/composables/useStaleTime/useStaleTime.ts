import { useLocalStorage } from '@vueuse/core';

import type { UseStaleTimeReturnType } from '@/composables/useStaleTime/useStaleTime.types.ts';

export const useStaleTime = (): UseStaleTimeReturnType => {
  const staleTime = useLocalStorage<number>('staleTime', 0);

  return { staleTime }
}