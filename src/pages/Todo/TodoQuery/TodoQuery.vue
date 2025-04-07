<template>
  <h3 :class="$style.header">
    useQuery
  </h3>

  <el-checkbox
    v-model="fetchError"
    label="Fetch Error"
  />

  <el-checkbox
    v-model="flagOne"
    label="Flag 1"
  />

  <el-checkbox
    v-model="flagTwo"
    label="Flag 2"
  />

  <div :class="$style.container">
    <div :class="$style.response">
      <div>Todo list:</div>

      <div v-if="data">
        <template
          v-for="todo in data"
          :key="todo.text"
        >
          <div :class="$style.todo">
            {{ todo.text }}
          </div>
        </template>
      </div>

      <div v-else-if="isPending">
        <el-skeleton
          :rows="3"
          animated
        />
      </div>

      <div v-else-if="isError">
        {{ error?.message || 'unknown error' }}
      </div>
    </div>

    <el-table
      :data="tableData"
      :class="$style.table"
    >
      <el-table-column
        prop="label"
        label="state"
      />

      <el-table-column
        prop="value"
        label="value"
      >
        <template #default="{ row }">
          <template v-if="['true', 'false'].includes(row.value)">
            <div :class="$style[row.value]">
              {{ row.value }}
            </div>
          </template>

          <template v-else>
            {{ row.value }}
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useTodoQueryPage } from '@/pages/Todo/TodoQuery/TodoQuery.composables.ts';

const {
  data,
  error,
  isError,
  isPending,
  tableData,
  flagOne,
  flagTwo,
  fetchError,
} = useTodoQueryPage()
</script>

<style module lang="sass">
.container
  gap: 30px
  display: flex

.todo
  margin-top: 10px
  border-radius: 5px
  padding: 5px 5px 5px 10px
  background-color: #ededed

.header
  margin-bottom: 20px

.table
  flex: 3

.response
  flex: 1
  margin-top: 15px

  :global(.el-skeleton__item)
    height: 29px
    margin-top: 10px

.true
  color: green

.false
  color: red

</style>