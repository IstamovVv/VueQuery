import { type UrlParams, useUrlSearchParams } from '@vueuse/core';
import type { Ref } from 'vue';
import { ref, toValue, watch } from 'vue';

import { guessSerializerType } from '@/composables/useQueryModel/guess.ts';
import { QuerySerializers } from '@/composables/useQueryModel/serialize.ts';
import type {
  UseQueryModelConfig,
  UseQueryModelDefinition, UseQueryModelSerializers,
  UseQueryModelSupportedObject
} from '@/composables/useQueryModel/useQueryModel.types.ts';

export const useQueryModel = <T extends UseQueryModelSupportedObject<T>>(
  definition: UseQueryModelDefinition<T>,
  config?: UseQueryModelConfig
): Ref<T> => {
  const key = config?.key || ''
  const removeNullishVariables = config?.removeNullishValues ?? false
  const onError = config?.onError || ((error: unknown) => console.error(`[useQueryModel]: ${error}`))

  const searchParameters = useUrlSearchParams('history')

  const constructSearchParameterName = (dataKey: string): string => {
    return key ? `${key}:${dataKey}` : dataKey
  }

  const keys = Object.keys(definition) as (keyof UseQueryModelDefinition<T>)[]

  const data = ref<T>(keys.reduce<T>((accumulator, key) => {
    accumulator[key] = toValue(definition[key].default)

    return accumulator
  }, {} as T)) as Ref<T>

  const serializers = keys.reduce<UseQueryModelSerializers<T>>((accumulator, key) => {
    accumulator[key] = QuerySerializers[guessSerializerType(toValue(definition[key].default))]

    return accumulator
  }, {} as UseQueryModelSerializers<T>)

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

        data.value[key] = value
      } else {
        data.value[key] = toValue(definition[key].default)
      }
    }
  }

  const dataWatchHandler = (d: T): void => {
    for (const key of keys) {
      searchParameters[constructSearchParameterName(key as string)] = serializers[key].write(d[key])
    }
  }

  watch(searchParameters, p => searchParametersWatchHandler(p), { immediate: true })
  watch(data, d => dataWatchHandler(d), { immediate: true })

  return data
}