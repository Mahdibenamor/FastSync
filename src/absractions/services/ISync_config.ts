import { Constructable } from "typedi";
import { ISyncalbeDataSource } from "../data/ISyncable_data_source";
import { ISyncableObject } from "../metadata/ISyncable_object";

export interface ISyncConfiguration{
    classTypeMap: { [key: string]: any };
    SetSyncalbeObject<T extends ISyncableObject>(entityType: Constructable<T>,  dataSource: ISyncalbeDataSource<T>)
}