<template>
  <el-popover
    ref="popover"
    width="auto"
    trigger="click"
    placement="bottom-start"
  >
    <template #reference>
      <el-button type="primary">
        Filters
      </el-button>
    </template>

    <div :class="$style.container">
      <h2 :class="$style.header">
        Filters
      </h2>

      <el-form label-width="auto">
        <el-form-item label="id range">
          <el-col :span="11">
            <el-input
              v-model="model.idFrom"
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
              v-model="model.idTo"
              type="number"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="date range">
          <el-col :span="11">
            <el-date-picker
              v-model="model.dateFrom"
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
              v-model="model.dateTo"
              type="date"
              aria-label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="Name">
          <TableFiltersNameSelect
            v-model="model.name"
          />
        </el-form-item>

        <div :class="$style.actions">
          <el-button @click="reset">
            Reset
          </el-button>

          <el-button @click="hidePopover">
            Cancel
          </el-button>

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
import type { PopoverInstance } from 'element-plus';
import { useTemplateRef } from 'vue';

import type { TableFiltersDefinition } from '@/pages/Table/Table.types.ts';
import { useTableFilters } from '@/pages/Table/TableFilters/TableFilters.composables.ts';
import type { TableFiltersEmits } from '@/pages/Table/TableFilters/TableFilters.types.ts';
import TableFiltersNameSelect from '@/pages/Table/TableFilters/TableFiltersNameSelect/TableFiltersNameSelect.vue';

const _model = defineModel<TableFiltersDefinition>({
  required: true
})

const emit = defineEmits<TableFiltersEmits>()

const {
  apply,
  reset,
  search,
  model,
} = useTableFilters(_model, emit)

const popoverRef = useTemplateRef<PopoverInstance>('popover')

const hidePopover = (): void => {
  popoverRef.value?.hide()
}
</script>

<style module lang="sass">
.container
  width: 500px

.header
  margin-bottom: 20px

.actions
  display: flex
  justify-content: end
</style>