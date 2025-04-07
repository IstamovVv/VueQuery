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

import { showNotification } from '@/utils';

const model = defineModel<boolean>({
  required: true,
  default: false
})

interface Props {
  loading: boolean
}

defineProps<Props>()

const input = ref<string>('');

const reset = () => {
  input.value = '';
}

watch(model, reset)

const create = () => {
  if (!input.value) {
    showNotification('Enter name')

    return
  }

  emit('create', input.value);
}

const emit = defineEmits<{
  create: [name: string]
}>()
</script>

<style module lang="sass">
.container
  gap: 10px
  display: flex
  flex-direction: column
</style>