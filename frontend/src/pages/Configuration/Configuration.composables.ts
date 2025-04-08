import { useQueryClient } from '@tanstack/vue-query';
import { computed, reactive, watch } from 'vue';

import { useConfiguration } from '@/composables/useConfiguration/useConfiguration.ts';
import {
  MAX_ERROR_CHANCE,
  MAX_REQUEST_DELAY,
  MAX_TOKEN_LIFETIME, MIN_CACHE_STALE_TIME,
  MIN_ERROR_CHANCE,
  MIN_REQUEST_DELAY,
  MIN_TOKEN_LIFETIME
} from '@/pages/Configuration/Configuration.constants.ts';
import { type AppConfiguration, type UseConfigurationPage } from '@/pages/Configuration/Configuration.types.ts';
import { showErrorMessage, showSuccessMessage } from '@/utils/popup';

export const useConfigurationPage = (): UseConfigurationPage => {
  const form = reactive<AppConfiguration>({
    tokenLifeTime: 0,
    requestDelay: 0,
    errorChance: 0,
    staleTime: 0,
  })

  const tokenLifetimeProxy = computed<number>({
    get() {
      return form.tokenLifeTime;
    },
    set(v: number) {
      form.tokenLifeTime = Math.min(Math.max(v, MIN_TOKEN_LIFETIME), MAX_TOKEN_LIFETIME)
    }
  })

  const requestDelayProxy = computed<number>({
    get() {
      return form.requestDelay;
    },
    set(v: number) {
      form.requestDelay = Math.min(Math.max(v, MIN_REQUEST_DELAY), MAX_REQUEST_DELAY);
    }
  })

  const errorChanceProxy = computed<number>({
    get() {
      return form.errorChance;
    },
    set(v: number) {
      form.errorChance = Math.min(Math.max(v, MIN_ERROR_CHANCE), MAX_ERROR_CHANCE)
    }
  })

  const staleTimeProxy = computed<number>({
    get() {
      return form.staleTime;
    },
    set(v: number) {
      form.staleTime = Math.max(v, MIN_CACHE_STALE_TIME)
    }
  })

  const queryClient = useQueryClient();
  const { query, mutation } = useConfiguration(queryClient)

  watch(query.data, d => {
    if (d) {
      form.errorChance = d.errorChance
      form.requestDelay = d.requestDelay
      form.tokenLifeTime = d.tokenLifeTime
      form.staleTime = d.staleTime
    }
  }, { immediate: true })

  const hasChanges = computed<boolean>(() => {
    if (!query.data.value) {
      return false
    }

    return form.tokenLifeTime !== query.data.value.tokenLifeTime ||
      form.errorChance !== query.data.value.errorChance ||
      form.requestDelay !== query.data.value.requestDelay ||
      form.staleTime !== query.data.value.staleTime
  })

  const saveConfig = (): void => {
    mutation.mutate({
      errorChance: form.errorChance,
      requestDelay: form.requestDelay,
      tokenLifeTime: form.tokenLifeTime,
      staleTime: form.staleTime,
    }, {
      onSuccess() {
        showSuccessMessage('Configuration successfully saved')
      },
      onError() {
        showErrorMessage('Failed to save configuration')
      }
    })
  }

  return {
    query,
    mutation,
    hasChanges,
    saveConfig,
    token: tokenLifetimeProxy,
    requestDelay: requestDelayProxy,
    errorChance: errorChanceProxy,
    staleTime: staleTimeProxy,
  }
}