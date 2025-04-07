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
      {{ error?.message }}
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
import { computed, ref } from 'vue';

import { useTableNameSuggestionsQuery } from '@/pages/Table/Table.composables.ts';

const INFINITE_SCROLL_DISTANCE = 400;

const model = defineModel<string[]>({
  required: true
})

const search = ref<string>('')

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  isError,
} = useTableNameSuggestionsQuery(search)

const options = computed<string[]>(() => data.value?.pages.flat() ?? [])

const filterMethod = (value: string) => {
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