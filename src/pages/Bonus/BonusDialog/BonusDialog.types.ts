import type { Ref } from 'vue';

export interface BonusDialogProps {
  loading: boolean
}

export interface BonusDialogEmits {
  create: [name: string]
}

export interface UseBonusDialogReturnType {
  input: Ref<string>
  create: () => void
}