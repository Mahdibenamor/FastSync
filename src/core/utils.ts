export function createInstance<T>(
  type: { new (...args: any[]): T },
  ...args: any[]
): T {
  const instance = new type(...args);
  return Object.assign(instance, args[0]);
}


export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}