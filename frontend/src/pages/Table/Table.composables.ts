import { useQuery } from '@tanstack/vue-query';
import { useRouteQuery } from '@vueuse/router';
import { toValue, watch } from 'vue';

import { api } from '@/api';
import { usePagination } from '@/composables/usePagination/usePagination.ts';
import { useSort } from '@/composables/useSort/useSort.ts';
import { TABLE_KEY, TABLE_QUERY_LIMIT } from '@/pages/Table/Table.constants.ts';
import type {
  TableColumn,
  TableRow, UseTableColumnsReturnType, UseTableFiltersReturnType,
  UseTableGetQueryDependencies, UseTablePageReturnType, UseTableQueryReturnType
} from '@/pages/Table/Table.types.ts';
import type { ResponseWithTotal } from '@/types';

export const useTablePage = (): UseTablePageReturnType => {
  const { columns } = useTableColumns()
  const paginationModel = usePagination(TABLE_QUERY_LIMIT)
  const sortModel = useSort<TableRow>(['id', 'name', 'date', 'count'])
  const { filterModel, reset: resetFilters } = useTableFilters()

  const getTableQueryData = useTableQuery({
    offset: paginationModel.offset,
    limit: TABLE_QUERY_LIMIT,
    sort: sortModel.query,
    filter: filterModel,
  })

  watch(getTableQueryData.data, v => {
    if (v) paginationModel.total.value = v.totalSize;
  }, { immediate: true })

  return {
    columns,
    sortModel,
    filterModel,
    resetFilters,
    paginationModel,
    getTableQueryData,
  }
}

export const useTableQuery = (deps: UseTableGetQueryDependencies): UseTableQueryReturnType => {
  return useQuery<ResponseWithTotal<TableRow>>({
    queryKey: [TABLE_KEY, ...Object.values(deps)],
    queryFn: async({ signal }) => {
      const parameters: any = {
        offset: toValue(deps.offset),
        limit: toValue(deps.limit),
        sort: toValue(deps.sort),
        dateFrom: deps.filter.dateFrom.value,
        dateTo: deps.filter.dateTo.value,
      }

      if (
        deps.filter.idTo.value && deps.filter.idTo.value > 0 &&
        deps.filter.idFrom.value && deps.filter.idFrom.value > 0
      ) {
        parameters.idFrom = deps.filter.idFrom.value
        parameters.idTo = deps.filter.idTo.value
      }

      if (deps.filter.search.value) {
        parameters.search = deps.filter.search.value
      }

      if (deps.filter.name.value.length > 0) {
        parameters.name = deps.filter.name.value
      }

      const response = await api.get<ResponseWithTotal<TableRow>>('/api/v1/table', {
        params: parameters,
        signal,
      })

      return response.data
    },
  })
}

const getNormalizedDate = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0));
}

export const useTableFilters = (): UseTableFiltersReturnType => {
  const getDefaultDateFrom = (): Date => new Date(getNormalizedDate().getTime() - 10 * 365 * 24 * 60 * 60 * 1000)
  const getDefaultDateTo = (): Date => getNormalizedDate()

  const model = {
    search: useRouteQuery<string>('search', ''),
    idFrom: useRouteQuery<string, number | undefined>('id', undefined, { transform: Number }),
    idTo: useRouteQuery<string, number | undefined>('id', undefined, { transform: Number }),
    dateFrom: useRouteQuery<string, Date>('dateFrom',getDefaultDateFrom().toISOString()),
    dateTo: useRouteQuery<string, Date>('dateFrom', getDefaultDateTo().toISOString()),
    name: useRouteQuery<string[]>('name', []),
  }

  const reset = (): void => {
    model.search.value = ''
    model.idFrom.value = undefined
    model.idTo.value = undefined
    model.dateFrom.value = getDefaultDateFrom()
    model.dateTo.value = getDefaultDateTo()
    model.name.value = []
  }

  return {
    filterModel: model,
    reset,
  }
}

export const useTableColumns = (): UseTableColumnsReturnType => {
  const columns: TableColumn[] = [
    { prop: 'id', label: 'Id' },
    { prop: 'name', label: 'Name' },
    { prop: 'date', label: 'Date' },
    { prop: 'count', label: 'Count' },
  ]

  return { columns }
}