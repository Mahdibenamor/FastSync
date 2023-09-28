import { Constructable } from "typedi/types/types/constructable.type";
import { ISyncableRepository } from "../abstraction/data/ISyncable_Repository";
import { ISyncableObject } from "../abstraction/metadata/ISyncable_object";
import { SyncConfiguration } from "./service/sync_config";
import { SyncVersionManager } from "./service/sync_version_manager";
import { IConflictsHandler } from "../abstraction/service/IConflicts_handler";

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
        FastSync.instance.setSyncConfiguration(syncConfiguration);
      }
      return FastSync.instance as FastSync;
    }

    public getSyncVersionManager(): SyncVersionManager{
        return this.syncConfiguration.syncVersionManager;
    }
  
    public setSyncConfiguration(syncConfiguration: SyncConfiguration) {
        this.syncConfiguration = syncConfiguration;
    }   

    public SetSyncalbeObject<T extends ISyncableObject>(entityType: Constructable<T>, repository: ISyncableRepository<T>, conflictsHandler?: IConflictsHandler) {
      this.syncConfiguration.SetSyncalbeObject(entityType,repository,conflictsHandler );
  }   
  }
  
