import { tableRowStubs } from './table.stub';
import { UseTableStateReturn } from './table.types';

export const useTableState = (): UseTableStateReturn => {
  return {
    tableRows: tableRowStubs,
  }
}