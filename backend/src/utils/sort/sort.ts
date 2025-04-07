import { isObjectValue } from '../index';
import { SortDirection, SortPair } from './sort.types';

export const parseSortParameter = (value: string): SortPair<string> => {
  const parts = value.split(':')

  if (parts.length !== 2) {
    throw new Error(`invalid value ${value}`)
  }

  const field = parts[0]

  if (field.length === 0) {
    throw new Error(`invalid field for ${value}`)
  }

  const direction = parts[1]

  if (!isObjectValue(SortDirection, direction)) {
    throw new Error(`invalid direction for ${ value }`);
  }

  return { field, direction }
}