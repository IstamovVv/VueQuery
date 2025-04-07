export const isObjectValue = <T extends object>(object: T, value: any): value is T[keyof T] =>
  Object.values(object).includes(value)

export const isObjectKey = <T extends object>(object: T, value: any): value is keyof T =>
  Object.keys(object).includes(value)

