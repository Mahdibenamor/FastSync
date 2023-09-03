export function createInstance<T>(
  type: { new (...args: any[]): T },
  ...args: any[]
): T {
  const instance = new type(...args);
  return Object.assign(instance, args[0]);
}
