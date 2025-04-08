import type { DefaultError } from '@tanstack/query-core';
import { type MutationOptions, type QueryClient, useMutation, useQuery } from '@tanstack/vue-query';

import { api } from '@/api';
import { CONFIGURATION_QUERY_KEY } from '@/composables/useConfiguration/useConfiguration.constants.ts';
import type {
  UseConfigurationMutationReturnType,
  UseConfigurationQueryReturnType
} from '@/composables/useConfiguration/useConfiguration.types.ts';
import type {
  AppConfiguration
} from '@/pages/Configuration/Configuration.types.ts';

export const useConfigurationQuery = (): UseConfigurationQueryReturnType => {
  return useQuery<AppConfiguration>({
    queryKey: [CONFIGURATION_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const response = await api.get<AppConfiguration>('/api/v1/config', { signal })

      return response.data
    },
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