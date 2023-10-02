import { SyncMetadataSchema } from "../metadata/sync_metadata_model";
import { SyncalbeObjectDataSource } from "./syncable_object_data_source";
import { SyncMetadata } from "fast-sync-core"

export class SyncMetadataDataSource  extends SyncalbeObjectDataSource<SyncMetadata> {
    constructor() {
        super(SyncMetadataSchema, SyncMetadata.name);
    }
}