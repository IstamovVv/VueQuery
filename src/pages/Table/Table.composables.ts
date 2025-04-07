import type { DefaultError } from '@tanstack/query-core';
import { type InfiniteData, type QueryKey, useInfiniteQuery, useQuery } from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';
import { toValue } from 'vue';

import { api } from '@/api';
import { useQueryModel } from '@/composables/useQueryModel/useQueryModel.ts';
import { NAME_SUGGESTIONS_LIMIT, TABLE_KEY } from '@/pages/Table/Table.constants.ts';
import type {
  TableColumn,
  TableFiltersDefinition,
  TableRow,
  UseTableGetQueryDependencies
} from '@/pages/Table/Table.types.ts';
import type { ResponseWithTotal } from '@/types';

export const useTableQuery = (deps: UseTableGetQueryDependencies) => {
  return useQuery<ResponseWithTotal<TableRow>>({
    queryKey: [TABLE_KEY, ...Object.values(deps)],
    queryFn: async({ signal }) => {
      const filterValue = toValue(deps.filter)

      const parameters: any = {
        offset: toValue(deps.offset),
        limit: toValue(deps.limit),
        sort: toValue(deps.sort),
        dateFrom: filterValue.dateFrom,
        dateTo: filterValue.dateTo,
      }

      if (filterValue.idTo > 0 && filterValue.idFrom > 0) {
        parameters.idFrom = filterValue.idFrom
        parameters.idTo = filterValue.idTo
      }

      if (filterValue.search) {
        parameters.search = filterValue.search
      }

      if (filterValue.name.length > 0) {
        parameters.name = filterValue.name
      }

      const response = await api.get<ResponseWithTotal<TableRow>>('/api/v1/table', {
        params: parameters,
        signal,
      })

      return response.data
    },
  })
}

export const useTableNameSuggestionsQuery = (search: MaybeRef<string>) => {
  return useInfiniteQuery<string[], DefaultError, InfiniteData<string[]>, QueryKey, number>({
    queryKey: [TABLE_KEY, search],
    queryFn: async ({ signal, pageParam }) => {
      const parameters: any = {
        offset: pageParam,
        limit: NAME_SUGGESTIONS_LIMIT
      }

      const searchValue = toValue(search)

      if (search) {
        parameters.search = searchValue
      }

      const response = await api.get<string[]>('/api/v1/table/name/suggestions', {
        signal,
        params: parameters,
      })

      return response.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParameter) => {
      if (lastPage.length === 0) {
        return
      }

      return lastPageParameter + NAME_SUGGESTIONS_LIMIT
    }
  })
}

export const useTableFilters = () => {
  const filterModel = useQueryModel<TableFiltersDefinition>({
    search: {
      default: '',
    },
    idFrom: {
      default: 0,
      validate: (v: number) => v >= 0,
    },
    idTo: {
      default: 0,
      validate: (v: number) => v >= 0,
    },
    dateFrom: {
      default: () => new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000), // now - 5 years
      validate: (v: Date) => !Number.isNaN(v.getTime())
    },
    dateTo: {
      default: () => new Date(),
      validate: (v: Date) => !Number.isNaN(v.getTime())
    },
    name: {
      default: () => [],
    }
  }, {
    key: 'tf',
    removeNullishValues: true,
  })

  return {
    filterModel
  }
}

export const useTableColumns = () => {
  const columns: TableColumn[] = [
    { prop: 'id', label: 'Id' },
    { prop: 'name', label: 'Name' },
    { prop: 'date', label: 'Date' },
    { prop: 'count', label: 'Count' },
  ]

  return { columns }
}