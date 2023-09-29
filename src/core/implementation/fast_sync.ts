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
        FastSync.setSyncConfiguration(syncConfiguration);
      }
      return FastSync.instance;
    }

    public getSyncVersionManager(): SyncVersionManager{
        return FastSync.instance.syncConfiguration.syncVersionManager;
    }
  
    private static setSyncConfiguration(syncConfiguration: SyncConfiguration) {
      FastSync.instance.syncConfiguration = syncConfiguration;
    }     

    public async setSyncalbeObject<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>, conflictsHandler?: IConflictsHandler) {
      let syncConfiguration= FastSync.instance.syncConfiguration;
      await syncConfiguration.setSyncalbeObject(entityType,repository,conflictsHandler );  
      FastSync.setSyncConfiguration(syncConfiguration);
    }

    public getObjectConflictsHandler(type:string): IConflictsHandler {
      return FastSync.instance.syncConfiguration.getObjectConflictsHandler(type);
    }

    public getObjectRepository<T extends ISyncableObject>(type: string): ISyncableRepository<T> {
      return FastSync.instance.syncConfiguration.getObjectRepository(type);
    }

  }
  
