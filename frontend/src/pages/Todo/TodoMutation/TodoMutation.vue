<template>
  <h3 :class="$style.header">
    useMutation
  </h3>

  <el-checkbox
    v-model="fetchError"
    label="Fetch Error"
  />

  <div :class="$style.container">
    <div :class="$style.todoContainer">
      <el-input
        v-model="inputText"
        :disabled="isPending"
        placeholder="Todo text"
      />

      <el-button
        :loading="isPending"
        @click="createTodo"
      >
        Create Todo
      </el-button>
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
          <template v-if="typeof row.value === 'boolean'">
            <div :class="row.value ? $style.true : $style.false">
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
import { useTodoMutationPage } from '@/pages/Todo/TodoMutation/TodoMutation.composables.ts';

const {
  isPending,
  inputText,
  fetchError,
  createTodo,
  tableData
} = useTodoMutationPage()
</script>

<style module lang="sass">
.container
  gap: 30px
  display: flex

.header
  margin-bottom: 10px

.todoContainer
  flex: 1
  gap: 10px
  display: flex
  align-items: start

.table
  flex: 3

.true
  color: green

.false
  color: red
</style>