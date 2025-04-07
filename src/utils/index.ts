import { ElMessageBox, type ElMessageBoxOptions, ElNotification, type MessageBoxData } from 'element-plus';

export const showNotification = (text: string, props?: NotificationOptions): void => {
  ElNotification({
    title: text,
    position: 'bottom-right',
    ...props
  })
}

export const showConfirmation = (
  header: string,
  message: string,
  options?: ElMessageBoxOptions,
): Promise<MessageBoxData> => {
  return ElMessageBox.confirm(message, header, {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    ...options
  })
}

export const asyncDebounce = <P extends unknown[], R>(callback: (...args: P) => Promise<R>, delay: number):
(...args: P) => Promise<R> => {
  let timeoutId = 0
  const queue: UsePromiseReturn<R>[] = []

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

interface UsePromiseReturn<T> {
  promise: Promise<T>,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void | undefined
}

export const usePromise = <T>(): UsePromiseReturn<T> => {
  let _resolve: ((value: T | PromiseLike<T>) => void) | undefined = undefined
  let _reject: ((reason?: any) => void) | undefined = undefined

  const promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })

  if (!_resolve || !_reject) {
    throw new Error('invalid code')
  }

  return {
    promise,
    resolve: _resolve,
    reject: _reject
  }
}

export const isObjectValue = <T extends object>(object: T, value: any): value is T[keyof T] =>
  Object.values(object).includes(value)

export const isObjectKey = <T extends object>(object: T, value: any): value is keyof T =>
  Object.keys(object).includes(value)

