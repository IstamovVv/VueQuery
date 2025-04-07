<template>
  <el-popover
    width="auto"
    trigger="click"
    placement="bottom-start"
  >
    <template #reference>
      <el-button type="primary">
        Filters
      </el-button>
    </template>

    <div :class="$style.popoverInner">
      <h2 :class="$style.popoverHeader">
        Filters
      </h2>

      <el-form label-width="auto">
        <el-form-item label="id range">
          <el-col :span="11">
            <el-input
              v-model="modelProxy.idFrom"
              type="number"
            />
          </el-col>

          <el-col
            :span="1"
            class="text-center"
            style="margin: 0 0.5rem"
          >
            -
          </el-col>

          <el-col :span="11">
            <el-input
              v-model="modelProxy.idTo"
              type="number"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="date range">
          <el-col :span="11">
            <el-date-picker
              v-model="modelProxy.dateFrom"
              type="date"
              aria-label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>

          <el-col
            :span="1"
            class="text-center"
            style="margin: 0 0.5rem"
          >
            -
          </el-col>

          <el-col :span="11">
            <el-date-picker
              v-model="modelProxy.dateTo"
              type="date"
              aria-label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="Name">
          <TableFiltersNameSelect
            v-model="modelProxy.name"
          />
        </el-form-item>

        <div :class="$style.popoverActions">
          <el-button>Cancel</el-button>

          <el-button
            type="primary"
            @click="apply"
          >
            Apply
          </el-button>
        </div>
      </el-form>
    </div>
  </el-popover>

  <el-input
    v-model="search"
    placeholder="Search by name"
  />
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { ref, watch } from 'vue';

import type { TableFiltersDefinition } from '@/pages/Table/Table.types.ts';
import TableFiltersNameSelect from '@/pages/Table/TableFilters/TableFiltersNameSelect/TableFiltersNameSelect.vue';

const model = defineModel<TableFiltersDefinition>({
  required: true
})

const modelProxy = ref<TableFiltersDefinition>({ ...model.value })

watch(model, m => {
  modelProxy.value = { ...m }
})

const search = ref<string>('')

watchDebounced(search, v => {
  model.value.search = v
}, { debounce: 1000 })

const apply = () => {
  model.value = { ...modelProxy.value }
}
</script>

<style module lang="sass">
.popoverInner
  width: 500px

.popoverHeader
  margin-bottom: 20px

.popoverActions
  display: flex
  justify-content: end
</style>