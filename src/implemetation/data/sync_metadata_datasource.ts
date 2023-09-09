import { SyncMetaData, SyncMetaDataSchema } from "../metadata/sync_metadata";
import { SyncalbeObjectDataSource } from "./syncable_object_data_source";

export class SyncMetaDataDataSource  extends SyncalbeObjectDataSource<SyncMetaData> {
    constructor() {
        super(SyncMetaDataSchema, SyncMetaData.name);
    }
}