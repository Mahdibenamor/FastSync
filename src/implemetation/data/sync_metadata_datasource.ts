import { SyncMetadata, SyncMetadataSchema } from "../metadata/sync_metadata";
import { SyncalbeObjectDataSource } from "./syncable_object_data_source";

export class SyncMetadataDataSource  extends SyncalbeObjectDataSource<SyncMetadata> {
    constructor() {
        super(SyncMetadataSchema, SyncMetadata.name);
    }
}