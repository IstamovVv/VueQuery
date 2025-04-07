import type { DefaultError } from '@tanstack/query-core';
import { type MutationOptions, type QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, reactive, watch } from 'vue';

import { api } from '@/api';
import {
  CONFIGURATION_QUERY_KEY,
  MAX_ERROR_CHANCE, MAX_REQUEST_DELAY,
  MAX_TOKEN_LIFETIME,
  MIN_ERROR_CHANCE, MIN_REQUEST_DELAY,
  MIN_TOKEN_LIFETIME
} from '@/pages/Configuration/Configuration.constants.ts';
import {
  type AppConfiguration,
  type UseConfigurationMutationReturnType,
  type UseConfigurationPage,
  type UseConfigurationQueryReturnType
} from '@/pages/Configuration/Configuration.types.ts';
import { showNotification } from '@/utils/popup';

export const useConfigurationPage = (): UseConfigurationPage => {
  const form = reactive<AppConfiguration>({
    tokenLifeTime: 0,
    requestDelay: 0,
    errorChance: 0
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

  const queryClient = useQueryClient()
  const query = useConfigurationQuery()

  watch(query.data, d => {
    if (d) {
      form.errorChance = d.errorChance
      form.requestDelay = d.requestDelay
      form.tokenLifeTime = d.tokenLifeTime
    }
  }, { immediate: true })

  const hasChanges = computed<boolean>(() => {
    if (!query.data.value) {
      return false
    }

    return form.tokenLifeTime !== query.data.value.tokenLifeTime ||
      form.errorChance !== query.data.value.errorChance ||
      form.requestDelay !== query.data.value.requestDelay
  })

  const mutation = useConfigurationMutation(queryClient, {
    onSuccess() {
      showNotification('Configuration successfully saved')
    },
    onError() {
      showNotification('Failed to save configuration')
    }
  })

  const saveConfig = (): void => {
    mutation.mutate({
      errorChance: form.errorChance,
      requestDelay: form.requestDelay,
      tokenLifeTime: form.tokenLifeTime,
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
  }
}

export const useConfigurationQuery = (): UseConfigurationQueryReturnType => {
  return useQuery<AppConfiguration>({
    queryKey: [CONFIGURATION_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const response = await api.get<AppConfiguration>('/api/v1/config', { signal })

      return response.data
    }
  })
}

export const useConfigurationMutation = (
  client: QueryClient,
  options?: MutationOptions<null, DefaultError, AppConfiguration>
): UseConfigurationMutationReturnType => {
  return useMutation<null, DefaultError, AppConfiguration>({
    mutationFn: async (config: AppConfiguration) => {
      return api.post('/api/v1/config', config)
    },
    ...options,
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: [CONFIGURATION_QUERY_KEY] })

      return options?.onSuccess?.(...args);
    },
  })
}