import { SyncMetadata } from "../../core/implementation/metadata/syncable_metadata";
import { SyncMetadataSchema } from "../metadata/sync_metadata_model";
import { SyncalbeObjectDataSource } from "./syncable_object_data_source";

export class SyncMetadataDataSource  extends SyncalbeObjectDataSource<SyncMetadata> {
    constructor() {
        super(SyncMetadataSchema, SyncMetadata.name);
    }
}