import { ISyncableDataSource } from "../abstraction/data/isyncable_data_source";
import { ISyncableRepository } from "../abstraction/data/isyncable_repository";
import { ISyncMetadata } from "../abstraction/metadata/isync_metadata";
import { ISyncableObject } from "../abstraction/metadata/isyncable_object";
import { SyncZoneRestrictionEnum } from "../abstraction/models/sync_zone_restriction";
import { IHttpManager } from "../abstraction/service/ihttp_manager";
import { ISyncManager } from "../abstraction/service/isync_manager";
import { SyncConfiguration } from "./service/sync_config";
import { SyncVersionManager } from "./service/sync_version_manager";

export class FastSync<V extends SyncConfiguration> {
  private static _instance: FastSync<any> | null = null;
  private _syncConfiguration: V | null = null;

  private constructor() {}

  static getInstance<V extends SyncConfiguration>(
    syncConfiguration?: V
  ): FastSync<V> {
    if (!FastSync._instance) {
      FastSync._instance = new FastSync();
    }
    if (
      FastSync._instance._syncConfiguration === null &&
      syncConfiguration !== undefined
    ) {
      FastSync.setSyncConfiguration(syncConfiguration);
    }
    return FastSync._instance as FastSync<V>;
  }

  static setSyncConfiguration<V extends SyncConfiguration>(
    syncConfiguration: V
  ): void {
    if (!FastSync._instance) {
      FastSync._instance = new FastSync();
    }
    FastSync._instance._syncConfiguration = syncConfiguration;
  }

  static getSyncConfiguration<V extends SyncConfiguration>(): V {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration as V;
  }

  static getSyncableTypes(): string[] {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration.syncableTypes;
  }

  static setSyncableObject<T extends ISyncableObject>(
    type: string,
    repository: ISyncableRepository<T>,
    syncZoneRestriction: SyncZoneRestrictionEnum = SyncZoneRestrictionEnum.global
  ): void {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    const syncConfiguration = FastSync._instance._syncConfiguration;
    syncConfiguration.setSyncableObject(type, repository);
    FastSync.setSyncConfiguration(syncConfiguration);
  }

  static getObjectRepository<T extends ISyncableObject>(
    type: string
  ): ISyncableRepository<T> {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    const selectedType = type;
    return FastSync._instance._syncConfiguration.getObjectRepository(
      selectedType
    );
  }

  static getTypeSyncZoneRestriction(type: string): SyncZoneRestrictionEnum {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration.getTypeSyncZoneRestriction(
      type
    );
  }

  static getSyncManager(): ISyncManager {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration.getSyncManager();
  }

  static setHttpManager(httpManager: IHttpManager): void {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    FastSync._instance._syncConfiguration.setHttpManager(httpManager);
  }

  static getHttpManager(): IHttpManager {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration.getHttpManager();
  }

  static getSyncVersionManager(): SyncVersionManager {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration.getSyncVersionManager();
  }

  static setTypeSyncZone<T extends ISyncableObject>(
    type: string,
    syncZoneRestriction: SyncZoneRestrictionEnum,
    syncZone?: string
  ): void {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    FastSync._instance._syncConfiguration.setTypeSyncZone(
      type,
      syncZoneRestriction,
      syncZone
    );
  }

  static getTypeSyncZone(type: string): string {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync._instance._syncConfiguration.getTypeSyncZone(type);
  }

  static getsyncMetadataDataSource(): ISyncableDataSource<ISyncMetadata> {
    if (!FastSync._instance || !FastSync._instance._syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.getSyncVersionManager().syncMetadataDataSource;
  }
}
