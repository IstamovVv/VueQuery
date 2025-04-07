import type { MaybeRefOrGetter, Serializer } from '@vueuse/core';

export type UseQueryModelSupportedType = string | number | boolean | object | null

export type UseQueryModelSerializers<T> = {
  [K in keyof T]: Serializer<T[K]>
}

export type UseQueryModelSupportedObject<T> = {
  [K in keyof T]: UseQueryModelSupportedType
}

export type UseQueryModelDefinition<T> = {
  [K in keyof T]: {
    default: MaybeRefOrGetter<T[K]>
    validate?: (value: T[K]) => boolean
  }
}

export interface UseQueryModelConfig {
  key?: string
  onError?: (error: unknown) => void
  removeNullishValues?: boolean
}