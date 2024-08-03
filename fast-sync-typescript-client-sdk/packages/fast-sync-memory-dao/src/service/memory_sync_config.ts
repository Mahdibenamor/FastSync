import { SyncConfiguration, SyncVersionManager } from "fast-sync-client";
import { SyncMetadataDataSource } from "../data/sync_metadata_source";

export class MemorySyncConfiguration extends SyncConfiguration {
  constructor() {
    super();
  }

  protected init() {
    this.setSyncVersionManager(
      new SyncVersionManager(new SyncMetadataDataSource())
    );
    super.init();
  }
}
