import { IBaseRepository } from "./base_repository";

export interface ISyncableRepository<T> extends IBaseRepository<T> {
  updateMany(entities: T[]): Promise<T[]>;
  addMany(entities: T[]): Promise<T[]>;
  removeMany(entities: T[]): Promise<T[]>;
}
