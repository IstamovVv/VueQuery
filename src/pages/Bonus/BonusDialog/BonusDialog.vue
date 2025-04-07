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
import { useBonusDialog } from '@/pages/Bonus/BonusDialog/BonusDialog.composables.ts';
import type { BonusDialogEmits, BonusDialogProps } from '@/pages/Bonus/BonusDialog/BonusDialog.types.ts';

defineProps<BonusDialogProps>()

const emit = defineEmits<BonusDialogEmits>()

const model = defineModel<boolean>({
  required: true,
  default: false
})

const {
  input,
  create
} = useBonusDialog(model, emit)
</script>

<style module lang="sass">
.container
  gap: 10px
  display: flex
  flex-direction: column
</style>