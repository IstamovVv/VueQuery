import type { MaybeRefOrGetter } from '@vueuse/core';
import type { Ref } from 'vue';

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

export interface UseSearchParametersModelReturnType<T> {
  model: Ref<T>
  reset: () => void
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