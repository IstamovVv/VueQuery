import type { MaybeRefOrGetter } from '@vueuse/core';

export type UseSearchParametersModelSupportedType = string | number | boolean | object | null

export type UseSearchParametersModelSerializers<T> = {
  [K in keyof T]: Serializer<T[K]>
}

export type UseSearchParametersModelSupportedObject<T> = {
  [K in keyof T]: UseSearchParametersModelSupportedType
}

export type UseSearchParametersModelDefinition<T> = {
  [K in keyof T]: {
    default: MaybeRefOrGetter<T[K]>
    validate?: (value: T[K]) => boolean
  }
}

export interface UseSearchParametersModelConfig {
  key?: string
  onError?: (error: unknown) => void
  removeNullishValues?: boolean
}

export interface Serializer<T> {
  read: (raw: string) => T
  write: (value: T) => string
}