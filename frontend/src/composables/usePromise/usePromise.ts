import type { UsePromiseReturnType } from '@/composables/usePromise/usePromise.types.ts';

export const usePromise = <T>(): UsePromiseReturnType<T> => {
  let _resolve: ((value: T | PromiseLike<T>) => void) | undefined = undefined
  let _reject: ((reason?: any) => void) | undefined = undefined

  const promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })

  if (!_resolve || !_reject) {
    throw new Error('unexpected resolve/reject type')
  }

  return {
    promise,
    resolve: _resolve,
    reject: _reject
  }
}
