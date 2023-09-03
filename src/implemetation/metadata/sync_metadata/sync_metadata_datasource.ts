import { Service } from "typedi";
import { SyncMetaData, SyncMetaDataSchema } from "./sync_metadata";
import { SyncalbeDataSource } from "../../data/syncable_data_source";

@Service()
export class SyncMetaDataDataSource  extends SyncalbeDataSource<SyncMetaData> {
    constructor() {
        super(SyncMetaDataSchema, SyncMetaData.name);
    }
}