import { type RemovableRef } from '@vueuse/shared';
import type { ComputedRef } from 'vue';

export interface UseAuthStoreReturn {
  token: RemovableRef<number | undefined>,
  authorized: ComputedRef<boolean>
}