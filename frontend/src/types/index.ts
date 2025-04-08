export type ResponseWithTotal<T> = {
  items: T[]
  totalSize: number
}