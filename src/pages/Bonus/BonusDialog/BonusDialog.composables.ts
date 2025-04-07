import type { EmitFn, ModelRef } from 'vue';
import { ref, watch } from 'vue';

import type { BonusDialogEmits, UseBonusDialogReturnType } from '@/pages/Bonus/BonusDialog/BonusDialog.types.ts'
import { showNotification } from '@/utils/popup';

export const useBonusDialog = (model: ModelRef<boolean>, emit: EmitFn<BonusDialogEmits>): UseBonusDialogReturnType => {
  const input = ref<string>('');

  const reset = (): void => {
    input.value = '';
  }

  const create = (): void => {
    if (!input.value) {
      showNotification('Enter name')

      return
    }

    emit('create', input.value);
  }

  watch(model, reset)

  return {
    input,
    create
  }
}