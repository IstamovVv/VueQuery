import type { DefaultError } from '@tanstack/query-core';
import { type MutationOptions, type QueryClient, useMutation, useQuery } from '@tanstack/vue-query';

import { api } from '@/api';
import { BONUS_QUERY_KEY } from '@/pages/Bonus/Bonus.constants.ts';
import type { Bonus, BonusMutationContext, BonusTagRequest } from '@/pages/Bonus/Bonus.types.ts';
import { asyncDebounce } from '@/utils';

export const useBonusGetQuery = () => {
  return useQuery({
    queryKey: [BONUS_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const response = await api.get<Bonus[]>('/api/v1/bonus', { signal })

      return response.data
    }
  })
}

const invalidateBonusGetQueryDebounced = asyncDebounce((client: QueryClient) =>
  client.invalidateQueries({ queryKey: [BONUS_QUERY_KEY] }), 1000)

export const useBonusCreateMutation = (client: QueryClient, options?: MutationOptions<null, DefaultError, string>) => {
  return useMutation<null, DefaultError, string>({
    mutationFn: async (name: string) => {
      return api.post('/api/v1/bonus', undefined, {
        params: { name }
      })
    },

    ...options,

    onSuccess: async (...args) => {
      await invalidateBonusGetQueryDebounced(client)
      options?.onSuccess?.(...args)
    },
  })
}

export const useBonusTagAddMutation =
  (client: QueryClient, options?: MutationOptions<null, DefaultError, BonusTagRequest, BonusMutationContext>) => {
    return useMutation<null, DefaultError, BonusTagRequest, BonusMutationContext>({
      mutationFn: async (request: BonusTagRequest) => {
        return api.post('/api/v1/bonus/tag', undefined, {
          params: request
        })
      },
      onMutate: async (request: BonusTagRequest) => {
        await client.cancelQueries({ queryKey: [BONUS_QUERY_KEY] })

        const rollback = () => {
          client.setQueryData<Bonus[]>([BONUS_QUERY_KEY], bonusList => {
            if (bonusList) {
              return bonusList.map(bonus => {
                if (bonus.name === request.name) {
                  return {
                    name: bonus.name,
                    tags: bonus.tags.filter(t => t.id !== request.tagId)
                  }
                }

                return bonus
              })
            }

            return bonusList
          })
        }

        client.setQueryData<Bonus[]>([BONUS_QUERY_KEY], bonusList => {
          if (bonusList) {
            return bonusList.map(bonus => {
              if (bonus.name === request.name) {
                return {
                  name: bonus.name,
                  tags: [...bonus.tags, { id: request.tagId }]
                }
              }

              return bonus
            })
          }

          return bonusList
        })

        return { rollback }
      },

      ...options,

      onSuccess: (...args) => {
        void invalidateBonusGetQueryDebounced(client)
        options?.onSuccess?.(...args)
      },

      onError: (error, request, context) => {
        context?.rollback()

        return options?.onError?.(error, request, context)
      },
    })
  }

export const useBonusTagDeleteMutation =
  (client: QueryClient, options?: MutationOptions<null, DefaultError, BonusTagRequest, BonusMutationContext>) => {
    return useMutation<null, DefaultError, BonusTagRequest, BonusMutationContext>({
      mutationFn: async (request: BonusTagRequest) => {
        return api.delete('/api/v1/bonus/tag', {
          params: request
        })
      },
      onMutate: async (request: BonusTagRequest) => {
        await client.cancelQueries({ queryKey: [BONUS_QUERY_KEY] })

        const rollback = () => {
          client.setQueryData<Bonus[]>([BONUS_QUERY_KEY], bonusList => {
            if (bonusList) {
              return bonusList.map(bonus => {
                if (bonus.name === request.name) {
                  return {
                    name: bonus.name,
                    tags: [...bonus.tags, { id: request.tagId }]
                  }
                }

                return bonus
              })
            }

            return bonusList
          })
        }

        client.setQueryData<Bonus[]>([BONUS_QUERY_KEY], bonusList => {
          if (bonusList) {
            return bonusList.map(bonus => {
              if (bonus.name === request.name) {
                return {
                  name: bonus.name,
                  tags: bonus.tags.filter(t => t.id !== request.tagId)
                }
              }

              return bonus
            })
          }

          return bonusList
        })

        return { rollback }
      },

      ...options,

      onSuccess: (...args) => {
        void invalidateBonusGetQueryDebounced(client)
        options?.onSuccess?.(...args)
      },

      onError: (error, request, context) => {
        context?.rollback()

        return options?.onError?.(error, request, context)
      },
    })
  }