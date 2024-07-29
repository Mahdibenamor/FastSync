import { SyncVersionManager } from "../../implementation/service/sync_version_manager";
import { ISyncableRepository } from "../data/isyncable_repository";
import { ISyncableObject } from "../metadata/isyncable_object";
import { IHttpManager } from "./ihttp_manager";
import { ISyncManager } from "./isync_manager";

export interface ISyncConfiguration {
  setSyncableObject<T extends ISyncableObject>(
    entityType: string,
    repository: ISyncableRepository<T>
  ): void;

  setObjectRepository<T extends ISyncableObject>(
    entityType: string,
    repository: ISyncableRepository<T>
  ): void;

  getObjectRepository<T extends ISyncableObject>(
    type: string
  ): ISyncableRepository<T>;

  getSyncManager(): ISyncManager;

  getHttpManager(): IHttpManager;

  setHttpManager(httpManager: IHttpManager): void;

  setSyncVersionManager(syncVersionManager: SyncVersionManager): void;

  getSyncVersionManager(): SyncVersionManager;
}
