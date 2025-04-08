import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

import type { UseAuthStoreReturn } from '@/store/auth/auth.types.ts';

const token = useLocalStorage<number | undefined>('token', 0)

const authorized = computed<boolean>(() => {
  if (!token.value) {
    return false
  }

  const now = new Date()

  return now.getTime() < token.value
})

export const useAuthStore = (): UseAuthStoreReturn => {
  return { token, authorized }
}