import { useQueryClient } from '@tanstack/vue-query';
import { computed, ref, watch } from 'vue';

import type { UseAppReturnType } from '@/composables/useApp/useApp.types.ts';
import { useConfiguration } from '@/composables/useConfiguration/useConfiguration.ts';
import { useStaleTime } from '@/composables/useStaleTime/useStaleTime.ts';
import { prefetchBonuses } from '@/pages/Bonus/Bonus.composables.ts';
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

  const prefetchFinished = ref<boolean>(false)

  const prefetch = async (): Promise<void> => {
    try {
      await prefetchBonuses()
    } catch (error: unknown) {
      console.error('prefetch failed', error)
    }

    prefetchFinished.value = true
  }

  const isLoading = computed<boolean>(() => {
    return query.isPending.value || !prefetchFinished.value
  })

  return {
    authorized,
    isLoading,
    prefetch,
  }
}