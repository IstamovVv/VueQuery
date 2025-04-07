export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortPair<T extends string> {
  field: T,
  direction: SortDirection,
}