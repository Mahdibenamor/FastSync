import { Constants } from "../../abstraction/constants";
import { ISyncableRepository } from "../../abstraction/data/isyncable_repository";
import { ISyncableObject } from "../../abstraction/metadata/isyncable_object";
import { SyncZoneRestrictionEnum } from "../../abstraction/models/sync_zone_restriction";
import { IHttpManager } from "../../abstraction/service/ihttp_manager";
import { ISyncConfiguration } from "../../abstraction/service/isync_config";
import { ISyncManager } from "../../abstraction/service/isync_manager";
import { SyncManager } from "./sync_manager";
import { SyncVersionManager } from "./sync_version_manager";

export class SyncConfiguration implements ISyncConfiguration {
  syncableTypes: string[] = [];
  namedInstances: { [key: string]: any } = {};
  private _typesSyncZones: { [key: string]: string } = {};

  constructor() {
    this.init();
  }

  protected init(): void {
    this.setSyncManager(new SyncManager());
  }

  setSyncableObject<T extends ISyncableObject>(
    entityType: string,
    fromJson: (object: any) => T,
    repository: ISyncableRepository<T>
  ): void {
    this.syncableTypes.push(entityType);
    this.namedInstances[entityType + Constants.fromJsonName] = fromJson;
    this.setObjectRepository(entityType, repository);
  }

  getTypeCreateFunction(type: string) {
    const fromJson = this.namedInstances[type + Constants.fromJsonName];
    if (!fromJson) {
      throw new Error(
        `Create Function ${type} is not configured well, please check the documentation to create the syncalbe object`
      );
    }
    return fromJson;
  }
  setObjectRepository<T extends ISyncableObject>(
    entityType: string,
    repository: ISyncableRepository<T>
  ): void {
    this.namedInstances[entityType + Constants.repositoryName] = repository;
  }

  setSyncZoneRestriction(
    entityType: string,
    syncZoneRestriction: SyncZoneRestrictionEnum | null
  ): void {
    if (syncZoneRestriction !== null) {
      this.namedInstances[entityType + Constants.syncZoneRestriction] =
        syncZoneRestriction;
    } else {
      throw new Error(
        `SyncZoneRestriction of the ${entityType} is not be undefined`
      );
    }
  }

  getTypeSyncZoneRestriction(type: string): SyncZoneRestrictionEnum {
    return this.namedInstances[type + Constants.syncZoneRestriction];
  }

  getObjectRepository<T extends ISyncableObject>(
    type: string
  ): ISyncableRepository<T> {
    return this.namedInstances[type + Constants.repositoryName];
  }

  getSyncManager(): ISyncManager {
    return this.namedInstances[Constants.syncManagerName];
  }

  setSyncManager(syncManager: ISyncManager): void {
    this.namedInstances[Constants.syncManagerName] = syncManager;
  }

  setHttpManager(httpManager: IHttpManager): void {
    this.namedInstances[Constants.httpManagerName] = httpManager;
  }

  getHttpManager(): IHttpManager {
    return this.namedInstances[Constants.httpManagerName];
  }

  getSyncVersionManager(): SyncVersionManager {
    return this.namedInstances[Constants.syncVersionManagerName];
  }

  setSyncVersionManager(syncVersionManager: SyncVersionManager): void {
    this.namedInstances[Constants.syncVersionManagerName] = syncVersionManager;
  }

  setTypeSyncZone<T>(
    type: string,
    syncZoneRestriction: SyncZoneRestrictionEnum,
    syncZone?: string
  ): void {
    if (
      syncZoneRestriction === SyncZoneRestrictionEnum.restricted &&
      !syncZone
    ) {
      throw new Error(
        "if you put syncZoneRestriction to restricted, you need to provide syncZone"
      );
    }
    if (syncZoneRestriction === SyncZoneRestrictionEnum.global) {
      syncZone = Constants.globalSyncZoneRestriction;
    }
    this._typesSyncZones[type] = syncZone!;
  }

  getTypeSyncZone(type: string): string {
    const syncZone = this._typesSyncZones[type];
    if (!syncZone) {
      throw new Error(
        `SyncZone for type ${type} is not configured well, please check the configuration before using syncManager`
      );
    }
    return syncZone;
  }
}
