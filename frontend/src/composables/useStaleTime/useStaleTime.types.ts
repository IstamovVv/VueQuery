import { type RemovableRef } from '@vueuse/shared';

export interface UseStaleTimeReturnType {
  staleTime: RemovableRef<number>
}