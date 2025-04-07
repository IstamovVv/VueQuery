export const wait = async (delay: number): Promise<void> => {
  await new Promise(r => setTimeout(r, delay));
}

export const isObjectValue = <T extends object>(object: T, value: any): value is T[keyof T] =>
  Object.values(object).includes(value)

export const isObjectKey = <T extends object>(object: T, value: any): value is keyof T =>
  Object.keys(object).includes(value)