import { Constructable } from "typedi";
import { ISyncalbeDataSource } from "../data/ISyncable_data_source";
import { ISyncableObject } from "../metadata/ISyncable_object";
import { IConflictsHandler } from "./IConflicts_handler";
import { SyncMetadata } from "../../implementation/metadata/syncable_metadata";

export interface ISyncConfiguration{
    classTypeMap: { [key: string]: any };
    SetSyncalbeObject<T extends ISyncableObject>(entityType: Constructable<T>,  dataSource: ISyncalbeDataSource<T>, conflictsHandler?: IConflictsHandler)
    initSyncVersionManager(syncMetadataDataSource: ISyncalbeDataSource<SyncMetadata>);
}