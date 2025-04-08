import type { ComputedRef, WritableComputedRef } from 'vue';

import type {
  UseConfigurationMutationReturnType,
  UseConfigurationQueryReturnType
} from '@/composables/useConfiguration/useConfiguration.types.ts';

export interface AppConfiguration {
  tokenLifeTime: number
  errorChance: number
  requestDelay: number
  staleTime: number
}

export interface UseConfigurationPage {
  query: UseConfigurationQueryReturnType
  mutation: UseConfigurationMutationReturnType
  hasChanges: ComputedRef<boolean>
  saveConfig: () => void
  token: WritableComputedRef<number>
  requestDelay: WritableComputedRef<number>
  errorChance: WritableComputedRef<number>
  staleTime: WritableComputedRef<number>
}