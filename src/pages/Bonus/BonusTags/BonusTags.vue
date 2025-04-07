<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { computed, ref } from 'vue';

import type { Bonus } from '@/pages/Bonus/Bonus.types.ts';
import { useTagsCreateMutation, useTagsGetQuery } from '@/pages/Bonus/BonusTags/BonusTags.composables.ts';
import { showNotification } from '@/utils';

const queryClient = useQueryClient()

interface Props {
  bonus: Bonus;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  add: [id: string],
  remove: [id: string]
}>()

const tags = computed<string[]>(() => {
  return props.bonus.tags.map(tag => tag.id)
})

const proxy = computed<string[]>({
  get() {
    return tags.value
  },
  set(newValue) {
    const newSet = new Set(newValue)
    const oldSet = new Set(tags.value)

    const added = newValue.filter(v => !oldSet.has(v))
    const removed = tags.value.filter(v => !newSet.has(v))

    if (added.length > 0) {
      emit('add', added[0])
    }

    if (removed.length > 0) {
      emit('remove', removed[0])
    }
  }
})

const { data: tagsData, isPending: isGetPending, isError: isGetError, error: getError } = useTagsGetQuery();

const input = ref<string>('')

const { isPending: isCreatePending, mutate } = useTagsCreateMutation(queryClient, {
  onSuccess: () => {
    showNotification('tag created')
    input.value = ''
  },
  onError: () => showNotification('failed to create tag')
})

const createTag = () => {
  if (!input.value) {
    showNotification('empty input')

    return
  }

  mutate(input.value)
}
</script>

<template>
  <el-select
    v-model="proxy"
    :loading="isGetPending"
    multiple
  >
    <template #header>
      <div :class="$style.selectHeader">
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

    <template v-if="tagsData">
      <el-option
        v-for="tag in tagsData"
        :key="tag"
        :label="tag"
        :value="tag"
      />
    </template>

    <template v-else-if="isGetError">
      {{ getError?.message }}
    </template>
  </el-select>
</template>

<style module lang="sass">
.selectHeader
  gap: 10px
  display: flex
</style>