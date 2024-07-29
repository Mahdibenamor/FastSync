export interface ISyncableDataSource<T> {
  addMany(entities: T[]): Promise<T[]>;
  add(entity: T): Promise<T>;
  hardDelete(): Promise<void>;
  updateMany(entities: T[]): Promise<T[]>;
  syncUpdate(entities: T[]): Promise<T[]>;
  update(id: string, entity: T): Promise<T>;
  getAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findByIds(ids: string[]): Promise<T[]>;
  count(): Promise<number>;
  dispose(): Promise<void>;
}
