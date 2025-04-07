import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationReturnType, UseQueryReturnType } from '@tanstack/vue-query';
import type { ComputedRef, WritableComputedRef } from 'vue';

export interface AppConfiguration {
  tokenLifeTime: number
  errorChance: number
  requestDelay: number
}

export interface UseConfigurationPage {
  query: UseConfigurationQueryReturnType
  mutation: UseConfigurationMutationReturnType
  hasChanges: ComputedRef<boolean>
  saveConfig: () => void
  token: WritableComputedRef<number>
  requestDelay: WritableComputedRef<number>
  errorChance: WritableComputedRef<number>
}

export type UseConfigurationQueryReturnType = UseQueryReturnType<AppConfiguration, DefaultError>

export type UseConfigurationMutationReturnType = UseMutationReturnType<null, DefaultError, AppConfiguration, unknown>