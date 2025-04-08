import type { QueryClient } from '@tanstack/vue-query';

import {
  useConfigurationMutation,
  useConfigurationQuery
} from '@/composables/useConfiguration/useConfiguration.composables.ts';
import type { UseConfigurationReturnType } from '@/composables/useConfiguration/useConfiguration.types.ts';

export const useConfiguration = (queryClient: QueryClient): UseConfigurationReturnType => {
  const query = useConfigurationQuery()
  const mutation = useConfigurationMutation(queryClient)

  return {
    query,
    mutation,
  }
}