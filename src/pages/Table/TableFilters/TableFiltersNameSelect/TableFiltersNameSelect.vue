<template>
  <el-select
    v-model="model"
    :filter-method="filterMethod"
    :teleported="false"
    multiple
    filterable
    placeholder="Select Name"
  >
    <template v-if="isError">
      {{ error?.message || 'unknown error' }}
    </template>

    <template v-else>
      <el-option-group
        v-infinite-scroll="fetchNextPage"
        :infinite-scroll-immediate="false"
        :infinite-scroll-disabled="isFetchingNextPage || !hasNextPage"
        :infinite-scroll-distance="INFINITE_SCROLL_DISTANCE"
      >
        <el-option
          v-for="option in options"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-option-group>

      <el-skeleton
        v-if="isFetchingNextPage"
        :class="$style.skeleton"
        :rows="5"
        loading
        animated
      />
    </template>

    <template #empty>
      <el-skeleton
        v-if="isPending"
        :class="$style.skeleton"
        :rows="5"
        loading
        animated
      />

      <div v-else>
        No Data
      </div>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import {
  useTableFiltersNameSelect,
} from '@/pages/Table/TableFilters/TableFiltersNameSelect/TableFiltersNameSelect.composables.ts';
import {
  INFINITE_SCROLL_DISTANCE
} from '@/pages/Table/TableFilters/TableFiltersNameSelect/TableFiltersNameSelect.constants.ts';

const model = defineModel<string[]>({
  required: true
})

const {
  search,
  options,
  suggestionsQueryData
} = useTableFiltersNameSelect()

const {
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  isError,
} = suggestionsQueryData

const filterMethod = (value: string): void => {
  search.value = value
}
</script>

<style module lang="sass">
.skeleton
  display: flex
  flex-direction: column
  align-items: start
  padding: 10px 20px
</style>