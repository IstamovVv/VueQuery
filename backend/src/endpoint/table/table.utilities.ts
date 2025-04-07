import { SortDirection } from '../../utils/sort/sort.types';
import { SortFunctions, TableRow } from './table.types';

export const tableRowSortFunctions: SortFunctions<TableRow> = {
  id: {
    [SortDirection.ASC]: (a: TableRow, b: TableRow) => a.id - b.id,
    [SortDirection.DESC]: (a: TableRow, b: TableRow) => b.id - a.id,
  },
  name: {
    [SortDirection.ASC]: (a: TableRow, b: TableRow) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    [SortDirection.DESC]: (a: TableRow, b: TableRow) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
  },
  date: {
    [SortDirection.ASC]: (a: TableRow, b: TableRow) => a.date.getTime() - b.date.getTime(),
    [SortDirection.DESC]: (a: TableRow, b: TableRow) => b.date.getTime() - a.date.getTime(),
  },
  count: {
    [SortDirection.ASC]: (a: TableRow, b: TableRow) => a.count - b.count,
    [SortDirection.DESC]: (a: TableRow, b: TableRow) => b.count - a.count,
  },
}