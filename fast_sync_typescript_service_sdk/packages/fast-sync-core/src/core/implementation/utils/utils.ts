import { IWithId } from "../../abstraction/metadata/Iwith_id";

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


export function isEmptyString(value: string): boolean {
  return isNullOrUndefined(value) || value == '';
}
export function createDict<T extends IWithId>(objects: T[]): {[id:string]:T}{
  let dict : {[id: string]: T} = {};
  for (const obj of objects) {
    dict[obj._id] =  obj;
  }
  return dict;
}