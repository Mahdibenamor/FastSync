export interface ISyncableRepository<T> {
  add(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  query(filter: (entity: T) => boolean): Promise<T[]>;
  count(): Promise<number>;
  updateMany(entities: T[]): Promise<T[]>;
  addMany(entities: T[]): Promise<T[]>;
  removeMany(entities: T[]): Promise<T[]>;
  dispose(): void;
}
