<template>
  <el-icon
    :class="$style.icon"
    @click="next"
  >
    <DCaret v-if="model === SortDirection.None" />

    <CaretTop v-else-if="model === SortDirection.ASC" />

    <CaretBottom v-else-if="model === SortDirection.DESC" />
  </el-icon>
</template>

<script setup lang="ts">
import { CaretBottom, CaretTop, DCaret } from '@element-plus/icons-vue';

import { SortDirection } from '@/composables/useSort/useSort.types.ts';

const model = defineModel<SortDirection>({
  required: true
})

const values = [SortDirection.None, SortDirection.ASC, SortDirection.DESC];

const next = () => {
  const currentIndex = values.indexOf(model.value)
  const nextIndex = (currentIndex + 1) % values.length

  model.value = values[nextIndex]
}
</script>

<style module lang="sass">
.icon
  cursor: pointer

  &:hover
    color: var(--el-color-primary)
</style>