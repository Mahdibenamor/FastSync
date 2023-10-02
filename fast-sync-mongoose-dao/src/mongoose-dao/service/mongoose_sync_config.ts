import { SyncConfiguration } from "../../core/implementation/service/sync_config";
import { SyncVersionManager } from "../../core/implementation/service/sync_version_manager";
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