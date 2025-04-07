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
import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed, ref } from 'vue';

import { api } from '@/api';
import type { Todo } from '@/pages/Todo/Todo.types.ts';
import { showConfirmation, showNotification } from '@/utils';

const inputText = ref<string>('')
const fetchError = ref<boolean>(false);

const queryClient = useQueryClient()

const { isPending, isError, error, isSuccess, mutate } = useMutation<null, DefaultError, Todo>({
  mutationFn: async (newTodo) => {
    return api.post('/api/v1/todo', undefined, {
      params: {
        text: newTodo.text,
        error: fetchError.value,
      }
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todo'] })
  }
})

const createTodo = () => {
  if (inputText.value === '') {
    showNotification('Empty name')

    return
  }

  showConfirmation('Creating TODO', `Do you really want to create todo ${inputText.value}`).then(() => {
    mutate({ text: inputText.value })
  })
}

const tableData = computed(() => [{
  label: 'isPending',
  value: isPending.value
}, {
  label: 'isSuccess',
  value: isSuccess.value
}, {
  label: 'isError',
  value: isError.value
}, {
  label: 'error',
  value: error.value
}])
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