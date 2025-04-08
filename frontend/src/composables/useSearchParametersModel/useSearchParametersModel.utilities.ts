import type { Serializer } from '@/composables/useSearchParametersModel/useSearchParametersModel.types.ts';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const guessSerializerType = <T extends(string | number | boolean | object | null)>(rawInit: T) => {
  return rawInit == undefined
    ? 'any'
    : rawInit instanceof Set
      ? 'set'
      // eslint-disable-next-line unicorn/no-nested-ternary
      : rawInit instanceof Map
        ? 'map'
        : rawInit instanceof Date
          ? 'date'
          : typeof rawInit === 'boolean'
            ? 'boolean'
            : typeof rawInit === 'string'
              ? 'string'
              : typeof rawInit === 'object'
                ? 'object'
                : Number.isNaN(rawInit)
                  ? 'any'
                  : 'number'
}

export const QuerySerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date', Serializer<any>> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify([...(v as Map<any, any>).entries()]),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify([...v as Set<any>]),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
}