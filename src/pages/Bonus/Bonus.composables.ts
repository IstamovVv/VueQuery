import type { DefaultError } from '@tanstack/query-core';
import { type MutationOptions, type QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

import { api } from '@/api';
import { BONUS_QUERY_KEY, INVALIDATE_BONUS_QUERY_DELAY } from '@/pages/Bonus/Bonus.constants.ts';
import type {
  Bonus,
  BonusMutationContext,
  BonusTagRequest,
  UseBonusCreateMutationReturnType,
  UseBonusGetQueryReturnType,
  UseBonusPageReturnType,
  UseBonusTagAddMutationReturnType,
  UseBonusTagDeleteMutationReturnType
} from '@/pages/Bonus/Bonus.types.ts';
import { asyncDebounce } from '@/utils/asyncDebounce';
import { showNotification } from '@/utils/popup';

export const useBonusPage = (): UseBonusPageReturnType => {
  const queryClient = useQueryClient()
  const dialogModel = ref<boolean>(false);

  const getQueryData = useBonusGetQuery()

  const createMutationData = useBonusCreateMutation(queryClient, {
    onSuccess: () => {
      dialogModel.value = false;
    },
    onError: () => {
      showNotification('failed to create bonus')
    }
  })

  const createBonus = (name: string): void => {
    createMutationData.mutate(name)
  }

  const { mutate: addMutate } = useBonusTagAddMutation(queryClient, {
    onSuccess: () => {
      showNotification('tag successfully added')
    },
    onError: () => {
      showNotification('failed to add tag')
    }
  })

  const { mutate: deleteMutate } = useBonusTagDeleteMutation(queryClient, {
    onSuccess: () => {
      showNotification('tag successfully deleted')
    },
    onError: () => {
      showNotification('failed to delete tag')
    }
  })

  const addTag = (name: string, tagId: string): void => {
    addMutate({ name, tagId })
  }

  const removeTag = (name: string, tagId: string): void => {
    deleteMutate({ name, tagId })
  }

  return {
    dialogModel,
    getQueryData,
    createMutationData,
    createBonus,
    addTag,
    removeTag,
  }
}

export const useBonusGetQuery = (): UseBonusGetQueryReturnType => {
  return useQuery<Bonus[], DefaultError>({
    queryKey: [BONUS_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const response = await api.get<Bonus[]>('/api/v1/bonus', { signal })

      return response.data
    }
  })
}

const invalidateBonusGetQueryDebounced = asyncDebounce((client: QueryClient) =>
  client.invalidateQueries({ queryKey: [BONUS_QUERY_KEY] }), INVALIDATE_BONUS_QUERY_DELAY)

export const useBonusCreateMutation = (
  client: QueryClient,
  options?: MutationOptions<null, DefaultError, string>
): UseBonusCreateMutationReturnType => {
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

export const useBonusTagAddMutation = (
  client: QueryClient,
  options?: MutationOptions<null, DefaultError, BonusTagRequest, BonusMutationContext>
): UseBonusTagAddMutationReturnType => {
  return useMutation<null, DefaultError, BonusTagRequest, BonusMutationContext>({
    mutationFn: async (request: BonusTagRequest) => {
      return api.post('/api/v1/bonus/tag', undefined, {
        params: request
      })
    },
    onMutate: async (request: BonusTagRequest) => {
      await client.cancelQueries({ queryKey: [BONUS_QUERY_KEY] })

      const rollback = (): void => {
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

export const useBonusTagDeleteMutation = (
  client: QueryClient,
  options?: MutationOptions<null, DefaultError, BonusTagRequest, BonusMutationContext>
): UseBonusTagDeleteMutationReturnType => {
  return useMutation<null, DefaultError, BonusTagRequest, BonusMutationContext>({
    mutationFn: async (request: BonusTagRequest) => {
      return api.delete('/api/v1/bonus/tag', {
        params: request
      })
    },
    onMutate: async (request: BonusTagRequest) => {
      await client.cancelQueries({ queryKey: [BONUS_QUERY_KEY] })

      const rollback = (): void => {
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