export interface ISyncalbeDataSource<T> {
  add(entity: T): Promise<T>;
  update(query: any, entity: T): Promise<T | null>;
  findById(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  query(filter: (entity: T) => boolean): Promise<T[]>;
  count(): Promise<number>;
  updateMany(entities: T[]): Promise<T[]>;
  addMany(entities: T[]): Promise<T[]>;
  dispose(): void;
}
