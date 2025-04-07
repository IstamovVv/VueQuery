<template>
  <el-dialog
    v-model="model"
    width="500"
    title="Create bonus"
  >
    <div :class="$style.container">
      <el-input
        v-model="input"
        :disabled="loading"
        placeholder="Enter bonus name"
      />

      <el-button
        :loading="loading"
        @click="create"
      >
        Create
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import type { BonusDialogProps } from '@/pages/Bonus/BonusDialog/BonusDialog.types.ts';
import { showNotification } from '@/utils';

defineProps<BonusDialogProps>()

const model = defineModel<boolean>({
  required: true,
  default: false
})

const emit = defineEmits<{
  create: [name: string]
}>()

const input = ref<string>('');

const reset = (): void => {
  input.value = '';
}

watch(model, reset)

const create = (): void => {
  if (!input.value) {
    showNotification('Enter name')

    return
  }

  emit('create', input.value);
}
</script>

<style module lang="sass">
.container
  gap: 10px
  display: flex
  flex-direction: column
</style>