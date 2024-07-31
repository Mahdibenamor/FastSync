import { SyncMetadata } from "fast-sync-client";
import { SyncableObjectDataSource } from "./syncable_object_data_source";

export class SyncMetadataDataSource extends SyncableObjectDataSource<SyncMetadata> {
  constructor() {
    super();
  }
}
