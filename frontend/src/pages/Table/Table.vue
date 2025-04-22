<template>
  <div :class="$style.header">
    <TableFilters
      v-model="filterModel"
      @reset="resetFilters"
    />
  </div>

  <div v-if="isError">
    Error: {{ error?.message || 'unknown error' }}
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
          <TableHeaderSort v-model="model[column.prop].value" />
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-if="total > 0"
    v-model:current-page="page"
    :page-size="TABLE_QUERY_LIMIT"
    :total="total"
    layout="prev, pager, next"
  />
</template>

<script setup lang="ts">
import { useTablePage } from '@/pages/Table/Table.composables.ts';
import { TABLE_QUERY_LIMIT } from '@/pages/Table/Table.constants.ts';
import TableFilters from '@/pages/Table/TableFilters/TableFilters.vue';
import TableHeaderSort from '@/pages/Table/TableHeaderSort.vue';

const {
  columns,
  sortModel,
  filterModel,
  resetFilters,
  paginationModel,
  getTableQueryData,
} = useTablePage()

const {
  model
} = sortModel

const {
  page,
  total,
} = paginationModel

const {
  data,
  error,
  isError,
  isPending
} = getTableQueryData
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