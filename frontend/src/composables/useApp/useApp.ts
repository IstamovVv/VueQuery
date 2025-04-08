import { useQueryClient } from '@tanstack/vue-query';
import { computed, watch } from 'vue';

import type { UseAppReturnType } from '@/composables/useApp/useApp.types.ts';
import { useConfiguration } from '@/composables/useConfiguration/useConfiguration.ts';
import { useStaleTime } from '@/composables/useStaleTime/useStaleTime.ts';
import { useAuthStore } from '@/store/auth/auth.ts';

export const useApp = (): UseAppReturnType => {
  const { authorized } = useAuthStore()
  const { staleTime } = useStaleTime()

  const { query } = useConfiguration(useQueryClient())

  watch(query.data, d => {
    if (d) {
      staleTime.value = d.staleTime
    }
  })

  const isLoading = computed<boolean>(() => {
    return query.isPending.value
  })

  return {
    authorized,
    isLoading,
  }
}