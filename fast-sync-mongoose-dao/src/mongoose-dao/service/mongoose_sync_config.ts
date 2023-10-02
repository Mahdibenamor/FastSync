import { SyncConfiguration } from "fast-sync-core"
import { SyncVersionManager } from "fast-sync-core"
import { SyncMetadataDataSource } from "../data/sync_metadata_datasource";

export class MongooseSyncConfiguration extends SyncConfiguration{
    constructor() {
        super();
      }

      protected init() {
        this.syncVersionManager = new SyncVersionManager(new SyncMetadataDataSource());
        super.init(); 
      }
}