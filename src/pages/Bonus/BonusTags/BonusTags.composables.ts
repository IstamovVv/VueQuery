import type { DefaultError } from '@tanstack/query-core';
import { type MutationOptions, type QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { type EmitFn } from 'vue';
import { computed, ref } from 'vue';

import { api } from '@/api';
import { TAG_QUERY_KEY } from '@/pages/Bonus/Bonus.constants.ts';
import type {
  BonusTagsEmits,
  BonusTagsProps,
  UseBonusTagsReturnType,
  UseTagsCreateMutationReturnType,
  UseTagsGetQueryReturnType
} from '@/pages/Bonus/BonusTags/BonusTags.types.ts';
import { showNotification } from '@/utils/popup';

export const useBonusTags = (props: BonusTagsProps, emit: EmitFn<BonusTagsEmits>): UseBonusTagsReturnType => {
  const input = ref<string>('')
  const queryClient = useQueryClient()

  const tags = computed<string[]>(() => {
    return props.bonus.tags.map(tag => tag.id)
  })

  const tagsProxy = computed<string[]>({
    get() {
      return tags.value
    },
    set(newValue) {
      const newSet = new Set(newValue)
      const oldSet = new Set(tags.value)

      const added = newValue.filter(v => !oldSet.has(v))
      const removed = tags.value.filter(v => !newSet.has(v))

      if (added.length > 0) {
        emit('add', added[0])
      }

      if (removed.length > 0) {
        emit('remove', removed[0])
      }
    }
  })

  const getTagsQueryData = useTagsGetQuery();

  const createTagMutationData = useTagsCreateMutation(queryClient, {
    onSuccess: () => {
      showNotification('tag created')
      input.value = ''
    },
    onError: () => showNotification('failed to create tag')
  })

  const createTag = (): void => {
    if (!input.value) {
      showNotification('empty input')

      return
    }

    createTagMutationData.mutate(input.value)
  }

  return {
    input,
    tags: tagsProxy,
    createTag,
    getTagsQueryData,
    createTagMutationData,
  }
}

export const useTagsGetQuery = (): UseTagsGetQueryReturnType => {
  return useQuery<string[]>({
    queryKey: [TAG_QUERY_KEY],
    queryFn: async ({ signal }) => {
      const response = await api.get<string[]>('/api/v1/tag', { signal })

      return response.data
    }
  })
}

export const useTagsCreateMutation = (
  client: QueryClient,
  options?: MutationOptions<null, DefaultError, string>
): UseTagsCreateMutationReturnType => {
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