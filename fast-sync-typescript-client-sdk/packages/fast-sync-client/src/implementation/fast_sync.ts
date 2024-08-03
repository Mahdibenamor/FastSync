import { ISyncableDataSource } from "../abstraction/data/isyncable_data_source";
import { ISyncableRepository } from "../abstraction/data/isyncable_repository";
import { ISyncMetadata } from "../abstraction/metadata/isync_metadata";
import { ISyncableObject } from "../abstraction/metadata/isyncable_object";
import { SyncZoneRestrictionEnum } from "../abstraction/models/sync_zone_restriction";
import { IHttpManager } from "../abstraction/service/ihttp_manager";
import { ISyncManager } from "../abstraction/service/isync_manager";
import { SyncConfiguration } from "./service/sync_config";
import { SyncVersionManager } from "./service/sync_version_manager";

export class FastSync {
  private static instance: FastSync;
  private syncConfiguration: SyncConfiguration;

  private constructor() {}

  public static getInstance(): FastSync;
  public static getInstance(syncConfiguration: SyncConfiguration): FastSync;

  public static getInstance(syncConfiguration?: SyncConfiguration): FastSync {
    if (!FastSync.instance) {
      FastSync.instance = new FastSync();
    }
    if (syncConfiguration) {
      FastSync.setSyncConfiguration(syncConfiguration);
    }
    return FastSync.instance;
  }

  private static setSyncConfiguration(syncConfiguration: SyncConfiguration) {
    FastSync.instance.syncConfiguration = syncConfiguration;
  }

  static getSyncConfiguration(): SyncConfiguration {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration;
  }

  static getSyncableTypes(): string[] {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration.syncableTypes;
  }

  static setSyncableObject<T extends ISyncableObject>(
    type: string,
    repository: ISyncableRepository<T>,
    syncZoneRestriction: SyncZoneRestrictionEnum = SyncZoneRestrictionEnum.global
  ): void {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    const syncConfiguration = FastSync.instance.syncConfiguration;
    syncConfiguration.setSyncableObject(type, repository);
    FastSync.setSyncConfiguration(syncConfiguration);
  }

  static getObjectRepository<T extends ISyncableObject>(
    type: string
  ): ISyncableRepository<T> {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    const selectedType = type;
    return FastSync.instance.syncConfiguration.getObjectRepository(
      selectedType
    );
  }

  static getTypeSyncZoneRestriction(type: string): SyncZoneRestrictionEnum {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration.getTypeSyncZoneRestriction(type);
  }

  static getSyncManager(): ISyncManager {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration.getSyncManager();
  }

  static setHttpManager(httpManager: IHttpManager): void {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    FastSync.instance.syncConfiguration.setHttpManager(httpManager);
  }

  static getHttpManager(): IHttpManager {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration.getHttpManager();
  }

  static getSyncVersionManager(): SyncVersionManager {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration.getSyncVersionManager();
  }

  static setTypeSyncZone(
    type: string,
    syncZoneRestriction: SyncZoneRestrictionEnum,
    syncZone?: string
  ): void {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    FastSync.instance.syncConfiguration.setTypeSyncZone(
      type,
      syncZoneRestriction,
      syncZone
    );
  }

  static getTypeSyncZone(type: string): string {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.instance.syncConfiguration.getTypeSyncZone(type);
  }

  static getsyncMetadataDataSource(): ISyncableDataSource<ISyncMetadata> {
    if (!FastSync.instance || !FastSync.instance.syncConfiguration) {
      throw new Error("Sync configuration is not set.");
    }
    return FastSync.getSyncVersionManager().syncMetadataDataSource;
  }
}
