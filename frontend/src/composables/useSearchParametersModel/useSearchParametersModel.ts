import { type UrlParams, useUrlSearchParams } from '@vueuse/core';
import type { Ref } from 'vue';
import { ref, toValue, watch } from 'vue';

import type {
  UseSearchParametersModelConfig,
  UseSearchParametersModelDefinition, UseSearchParametersModelReturnType, UseSearchParametersModelSerializers,
  UseSearchParametersModelSupportedObject
} from '@/composables/useSearchParametersModel/useSearchParametersModel.types.ts';
import {
  guessSerializerType,
  QuerySerializers
} from '@/composables/useSearchParametersModel/useSearchParametersModel.utilities.ts';

export const useSearchParametersModel = <T extends UseSearchParametersModelSupportedObject<T>>(
  definition: UseSearchParametersModelDefinition<T>,
  config?: UseSearchParametersModelConfig
): UseSearchParametersModelReturnType<T> => {
  const key = config?.key || ''
  const removeNullishVariables = config?.removeNullishValues ?? false
  const onError = config?.onError || ((error: unknown) => console.error(`[useSearchParametersModel]: ${error}`))

  const searchParameters = useUrlSearchParams('history')

  const constructSearchParameterName = (dataKey: string): string => {
    return key ? `${key}:${dataKey}` : dataKey
  }

  const keys = Object.keys(definition) as (keyof UseSearchParametersModelDefinition<T>)[]

  const model = ref<T>(keys.reduce<T>((accumulator, key) => {
    accumulator[key] = toValue(definition[key].default)

    return accumulator
  }, {} as T)) as Ref<T>

  const serializers = keys.reduce<UseSearchParametersModelSerializers<T>>((accumulator, key) => {
    accumulator[key] = QuerySerializers[guessSerializerType(toValue(definition[key].default))]

    return accumulator
  }, {} as UseSearchParametersModelSerializers<T>)

  const searchParametersWatchHandler = (p: UrlParams): void => {
    for (const key of keys) {
      const urlValue = p[constructSearchParameterName(key as string)]

      if (Array.isArray(urlValue)) {
        continue // dont parse arrays for now
      }

      if (urlValue) {
        const serializer = serializers[key]

        let value = toValue(definition[key].default)

        try {
          value = serializer.read(urlValue)

          if (removeNullishVariables) {
            value ??= toValue(definition[key].default)
          }

          if (definition[key].validate && !definition[key].validate(value)) {
            value = toValue(definition[key].default)
          }
        } catch (error: unknown) {
          onError(error)
        }

        model.value[key] = value
      } else {
        model.value[key] = toValue(definition[key].default)
      }
    }
  }

  const dataWatchHandler = (d: T): void => {
    for (const key of keys) {
      searchParameters[constructSearchParameterName(key as string)] = serializers[key].write(d[key])
    }
  }

  watch(searchParameters, p => searchParametersWatchHandler(p), { immediate: true })
  watch(model, d => dataWatchHandler(d), { immediate: true })

  const reset = (): void => {
    for (const key of keys) {
      model.value[key] = toValue(definition[key].default)
    }
  }

  return {
    model,
    reset,
  }
}