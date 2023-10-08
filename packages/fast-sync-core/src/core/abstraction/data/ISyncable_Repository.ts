import { ISyncMetadata } from "../metadata/ISync_metadata";
import { IBaseRepository } from "./base_repository";

export interface ISyncableRepository<T> extends IBaseRepository<T> {
  updateMany(entities: T[], metadata: ISyncMetadata): Promise<T[]>;
  addMany(entities: T[], metadata: ISyncMetadata): Promise<T[]>;
  removeMany(entities: T[], metadata: ISyncMetadata): Promise<T[]>;
  fetchMany(metadata: ISyncMetadata):Promise<T[]>;
}
