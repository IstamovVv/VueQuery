import type { DefaultError } from '@tanstack/query-core';
import { type MutationOptions, type QueryClient, useMutation, useQuery } from '@tanstack/vue-query';

import { api } from '@/api';
import { TAG_QUERY_KEY } from '@/pages/Bonus/Bonus.constants.ts';

export const useTagsGetQuery = () => {
  return useQuery({
    queryKey: [TAG_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const response = await api.get<string[]>('/api/v1/tag', { signal })

      return response.data
    }
  })
}

export const useTagsCreateMutation = (client: QueryClient, options?: MutationOptions<null, DefaultError, string>) => {
  return useMutation<null, DefaultError, string>({
    mutationFn: async (tagId: string) => {
      return api.post('/api/v1/tag', undefined, {
        params: {
          tagId: tagId,
        }
      })
    },
    ...options,
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: [TAG_QUERY_KEY] })

      return options?.onSuccess?.(...args);
    },
  })
}