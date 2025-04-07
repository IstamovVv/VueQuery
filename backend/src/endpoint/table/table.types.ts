import { SortDirection } from '../../utils/sort/sort.types';
import { Bonus } from '../bonus/bonus.types';

export interface UseBonusStateReturnType {
  tags: Set<string>
  bonuses: Bonus[]
}

export interface TableRow {
  id: number
  name: string
  date: Date
  count: number
}

export interface UseTableStateReturn {
  tableRows: TableRow[]
}

export type SortFunction<T> = (a: T, b: T) => number

export type SortFunctions<T extends object> = {
  [K in keyof T]: {
    [SortDirection.ASC]: SortFunction<T>,
    [SortDirection.DESC]: SortFunction<T>
  }
}