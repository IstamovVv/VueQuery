import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationReturnType, UseQueryReturnType } from '@tanstack/vue-query';

import type { AppConfiguration } from '@/pages/Configuration/Configuration.types.ts';

export interface UseConfigurationReturnType {
  query: UseConfigurationQueryReturnType
  mutation: UseConfigurationMutationReturnType
}

export type UseConfigurationQueryReturnType = UseQueryReturnType<AppConfiguration, DefaultError>
export type UseConfigurationMutationReturnType = UseMutationReturnType<null, DefaultError, AppConfiguration, unknown>