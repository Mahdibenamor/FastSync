export interface IBaseRepository<T> {
  add(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  remove(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  query(query: (entity: T) => boolean): Promise<T[]>;
  count(): Promise<number>;
  dispose(): void;
}
