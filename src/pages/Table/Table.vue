<template>
  <div :class="$style.header">
    <TableFilters v-model="filterModel" />
  </div>

  <div v-if="isError">
    Error: {{ error }}
  </div>

  <el-table
    v-loading="isPending"
    :data="data?.items || []"
    :class="$style.table"
  >
    <el-table-column
      v-for="column of columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
    >
      <template #header>
        <div :class="$style.tableHeader">
          {{ column.label }}
          <TableHeaderSort v-model="sort[column.prop]" />
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-if="total > 0"
    v-model:current-page="page"
    :page-size="LIMIT"
    :total="total"
    layout="prev, pager, next"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { usePagination } from '@/composables/usePagination/usePagination.ts';
import { useSort } from '@/composables/useSort/useSort.ts';
import { useTableColumns, useTableFilters, useTableQuery } from '@/pages/Table/Table.composables.ts';
import type { TableRow } from '@/pages/Table/Table.types.ts';
import TableFilters from '@/pages/Table/TableFilters.vue';
import TableHeaderSort from '@/pages/Table/TableHeaderSort.vue';

const LIMIT = 10

const { columns } = useTableColumns()
const { filterModel } = useTableFilters()
const { page, total, offset } = usePagination(LIMIT)
const { data: sort, query: sortQuery } = useSort<TableRow>(['id', 'name', 'date', 'count'])

const { data, isPending, isError, error } = useTableQuery({
  offset,
  limit: LIMIT,
  sort: sortQuery,
  filter: filterModel,
})

watch(data, v => {
  if (v) total.value = v.totalSize;
})
</script>

<style module lang="sass">
.header
  gap: 10px
  display: flex
  justify-content: start

  :global(.el-input)
    width: auto

  :global(.el-select)
    width: auto

.table
  height: 400px

.tableHeader
  display: flex
  justify-content: space-between
  user-select: none
</style>