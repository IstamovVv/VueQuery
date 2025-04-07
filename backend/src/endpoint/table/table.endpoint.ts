import { Express } from 'express';

import { isObjectKey, wait } from '../../utils';
import { parseSortParameter } from '../../utils/sort/sort';
import { SortPair } from '../../utils/sort/sort.types';
import { ResponseWithTotal } from '../../utils/types';
import { useAuth } from '../auth/auth.service';
import { useTableState } from './table.state';
import { TableRow } from './table.types';
import { tableRowSortFunctions } from './table.utilities';

const { check: checkAuth } = useAuth();

export const registerTable = (app: Express): void => {
  app.get('/api/v1/table', async (request, response) => {
    await wait(1000);

    if (!checkAuth(request, response)) return

    const offset = Number(request.query.offset)

    if (Number.isNaN(offset)) {
      response.status(400).send('invalid offset')

      return
    }

    const limit = Number(request.query.limit)

    if (Number.isNaN(limit)) {
      response.status(400).send('invalid limit')

      return
    }

    const sortPairs: SortPair<keyof TableRow>[] = []

    if (request.query.sort && Array.isArray(request.query.sort)) {
      for (const item of request.query.sort) {
        if (typeof item === 'string') {
          try {
            const parsed = parseSortParameter(item)

            if (isObjectKey(tableRowSortFunctions, parsed.field)) {
              sortPairs.push({
                field: parsed.field,
                direction: parsed.direction,
              })
            } else {
              response.status(400).send('invalid sort')

              continue
            }
          } catch {
            response.status(400).send('invalid sort')

            continue
          }
        }
      }
    }

    const { tableRows } = useTableState();
    let tableRowsCopy = [...tableRows];

    if (request.query.dateFrom && typeof request.query.dateFrom === 'string') {
      const timestamp = Date.parse(request.query.dateFrom)

      if (!Number.isNaN(timestamp)) {
        tableRowsCopy = tableRowsCopy.filter(v => {
          return v.date.getTime() >= timestamp
        })
      }
    }

    if (request.query.dateTo && typeof request.query.dateTo === 'string') {
      const timestamp = Date.parse(request.query.dateTo)

      if (!Number.isNaN(timestamp)) {
        tableRowsCopy = tableRowsCopy.filter(v => {
          return v.date.getTime() <= timestamp
        })
      }
    }

    if (request.query.idFrom && typeof request.query.idFrom === 'string') {
      const idFrom = Number(request.query.idFrom)

      if (!Number.isNaN(idFrom)) {
        tableRowsCopy = tableRowsCopy.filter(v => {
          return v.id >= idFrom
        })
      }
    }

    if (request.query.idTo && typeof request.query.idTo === 'string') {
      const idTo = Number(request.query.idTo)

      if (!Number.isNaN(idTo)) {
        tableRowsCopy = tableRowsCopy.filter(v => {
          return v.id <= idTo
        })
      }
    }

    if (request.query.search && typeof request.query.search === 'string') {
      const search = request.query.search.toLowerCase()

      tableRowsCopy = tableRowsCopy.filter(v => v.name.toLowerCase().includes(search))
    }

    if (request.query.name && Array.isArray(request.query.name)) {
      const nameArray = request.query.name

      tableRowsCopy = tableRowsCopy.filter(v => nameArray.includes(v.name))
    }

    if (sortPairs) {
      tableRowsCopy.sort((a: TableRow, b: TableRow): number => {
        for (const pair of sortPairs) {
          const function_ = tableRowSortFunctions[pair.field][pair.direction];

          const result = function_(a, b)

          if (result !== 0) {
            return result
          }
        }

        return 0
      });
    }

    const result: ResponseWithTotal<TableRow> = {
      items: tableRowsCopy.slice(offset, offset+limit),
      totalSize: tableRowsCopy.length,
    }

    response.status(200).json(result)
  })

  app.get('/api/v1/table/name/suggestions', async (request, response) => {
    await wait(1000);

    if (!checkAuth(request, response)) return

    const offset = Number(request.query.offset)

    if (Number.isNaN(offset)) {
      response.status(400).send('invalid offset')

      return
    }

    const limit = Number(request.query.limit)

    if (Number.isNaN(limit)) {
      response.status(400).send('invalid limit')

      return
    }

    const { tableRows } = useTableState();
    let nameList = tableRows.map(row => row.name)

    nameList = [...new Set(nameList)]

    if (request.query.search && typeof request.query.search === 'string') {
      const search = request.query.search.toLowerCase()

      nameList = nameList.filter(v => v.toLowerCase().includes(search))
    }

    response.status(200).json(nameList.slice(offset, offset+limit))
  })
}
