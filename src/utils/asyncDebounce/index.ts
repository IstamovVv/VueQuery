import { usePromise } from '@/composables/usePromise/usePromise.ts';
import type { UsePromiseReturnType } from '@/composables/usePromise/usePromise.types.ts';

export const asyncDebounce = <P extends unknown[], R>(callback: (...args: P) => Promise<R>, delay: number):
(...args: P) => Promise<R> => {
  let timeoutId = 0
  const queue: UsePromiseReturnType<R>[] = []

  return (...args: P): Promise<R> => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(async () => {
      try {
        const response = await callback(...args)

        for (const p of queue) p.resolve(response)
      } catch (error) {
        for (const p of queue) p.reject(error)
      }
    }, delay)

    const promiseData = usePromise<R>()

    queue.push(promiseData)

    return promiseData.promise
  }
}