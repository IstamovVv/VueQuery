import { useQuery } from '@tanstack/vue-query';
import { toValue, watch } from 'vue';

import { api } from '@/api';
import { usePagination } from '@/composables/usePagination/usePagination.ts';
import { useSearchParametersModel } from '@/composables/useSearchParametersModel/useSearchParametersModel.ts';
import { useSort } from '@/composables/useSort/useSort.ts';
import { TABLE_KEY, TABLE_QUERY_LIMIT } from '@/pages/Table/Table.constants.ts';
import type {
  TableColumn,
  TableFiltersDefinition,
  TableRow, UseTableColumnsReturnType, UseTableFiltersReturnType,
  UseTableGetQueryDependencies, UseTablePageReturnType, UseTableQueryReturnType
} from '@/pages/Table/Table.types.ts';
import type { ResponseWithTotal } from '@/types';

export const useTablePage = (): UseTablePageReturnType => {
  const { columns } = useTableColumns()
  const { filterModel, reset: resetFilters } = useTableFilters()

  const paginationModel = usePagination(TABLE_QUERY_LIMIT)
  const sortModel = useSort<TableRow>(['id', 'name', 'date', 'count'])

  const getTableQueryData = useTableQuery({
    offset: paginationModel.offset,
    limit: TABLE_QUERY_LIMIT,
    sort: sortModel.query,
    filter: filterModel,
  })

  watch(getTableQueryData.data, v => {
    if (v) paginationModel.total.value = v.totalSize;
  })

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

const getNormalizedDate = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0));
}

export const useTableFilters = (): UseTableFiltersReturnType => {
  const { model, reset } = useSearchParametersModel<TableFiltersDefinition>({
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
      default: () => new Date(getNormalizedDate().getTime() - 10 * 365 * 24 * 60 * 60 * 1000),
      validate: (v: Date) => !Number.isNaN(v.getTime())
    },
    dateTo: {
      default: () => getNormalizedDate(),
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