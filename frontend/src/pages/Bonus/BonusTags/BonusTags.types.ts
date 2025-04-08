import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationReturnType, UseQueryReturnType } from '@tanstack/vue-query';
import type { Ref, WritableComputedRef } from 'vue';

import type { Bonus } from '@/pages/Bonus/Bonus.types.ts';

export interface BonusTagsProps {
  bonus: Bonus;
}

export interface BonusTagsEmits {
  add: [id: string],
  remove: [id: string]
}

export interface UseBonusTagsReturnType {
  input: Ref<string>
  tags: WritableComputedRef<string[]>
  createTag: () => void
  getTagsQueryData: UseTagsGetQueryReturnType
  createTagMutationData: UseTagsCreateMutationReturnType
}

export type UseTagsGetQueryReturnType = UseQueryReturnType<string[], DefaultError>;

export type UseTagsCreateMutationReturnType = UseMutationReturnType<null, DefaultError, string, unknown>;