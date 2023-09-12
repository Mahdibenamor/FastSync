import { ISyncMetaData } from "../metadata/ISync_metadata";

export interface ISyncalbeDataSource<T> {
  add(entity: T): Promise<T>;
  update(query: any, entity: T): Promise<T | null>;
  findById(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  query(ISyncMetaData :ISyncMetaData): Promise<T[]>;
  count(): Promise<number>;
  updateMany(entities: T[]): Promise<T[]>;
  addMany(entities: T[]): Promise<T[]>;
  dispose(): void;
}
