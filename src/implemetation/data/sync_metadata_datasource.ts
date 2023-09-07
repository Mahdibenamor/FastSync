import { Service } from "typedi";
import { SyncMetaData, SyncMetaDataSchema } from "../metadata/sync_metadata";
import { SyncalbeObjectDataSource } from "./syncable_object_data_source";

@Service()
export class SyncMetaDataDataSource  extends SyncalbeObjectDataSource<SyncMetaData> {
    constructor() {
        super(SyncMetaDataSchema, SyncMetaData.name);
    }
}