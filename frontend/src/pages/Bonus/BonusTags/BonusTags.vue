<template>
  <el-select
    v-model="tags"
    :loading="isGetPending"
    multiple
  >
    <template #header>
      <div :class="$style.header">
        <el-input
          v-model="input"
          :disabled="isCreatePending"
        />

        <el-button
          :loading="isCreatePending"
          icon="plus"
          type="success"
          @click="createTag"
        />
      </div>
    </template>

    <template v-if="data">
      <el-option
        v-for="tag in data"
        :key="tag"
        :label="tag"
        :value="tag"
      />
    </template>

    <template v-else-if="isGetError">
      {{ getError?.message || 'unknown error' }}
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { useBonusTags } from '@/pages/Bonus/BonusTags/BonusTags.composables.ts';
import type { BonusTagsEmits, BonusTagsProps } from '@/pages/Bonus/BonusTags/BonusTags.types.ts';

const props = defineProps<BonusTagsProps>()
const emit = defineEmits<BonusTagsEmits>()

const {
  input,
  tags,
  createTag,
  getTagsQueryData,
  createTagMutationData,
} = useBonusTags(props, emit)

const {
  data,
  error: getError,
  isError: isGetError,
  isPending: isGetPending,
} = getTagsQueryData

const {
  isPending: isCreatePending
} = createTagMutationData
</script>

<style module lang="sass">
.header
  gap: 10px
  display: flex
</style>