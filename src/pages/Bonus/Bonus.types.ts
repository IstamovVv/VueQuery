import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationReturnType, UseQueryReturnType } from '@tanstack/vue-query';
import type { Ref } from 'vue';

export interface Tag {
  id: string
}

export interface Bonus {
  name: string
  tags: Tag[]
}

export interface BonusTagRequest {
  name: string
  tagId: string
}

export interface BonusMutationContext {
  rollback: () => void
}

export interface UseBonusPageReturnType {
  dialogModel: Ref<boolean>
  getQueryData: UseBonusGetQueryReturnType
  createMutationData: UseBonusCreateMutationReturnType
  createBonus: (name: string) => void
  addTag: (name: string, tagId: string) => void
  removeTag: (name: string, tagId: string) => void
}

export type UseBonusGetQueryReturnType = UseQueryReturnType<Bonus[], DefaultError>

export type UseBonusCreateMutationReturnType = UseMutationReturnType<null, DefaultError, string, unknown>

export type UseBonusTagAddMutationReturnType =
  UseMutationReturnType<null, DefaultError, BonusTagRequest, BonusMutationContext>

export type UseBonusTagDeleteMutationReturnType
  = UseMutationReturnType<null, DefaultError, BonusTagRequest, BonusMutationContext>