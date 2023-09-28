import { Constructable } from "typedi";
import { ISyncableObject } from "../metadata/ISyncable_object";
import { IConflictsHandler } from "./IConflicts_handler";
import { ISyncableRepository } from "../data/ISyncable_Repository";

export interface ISyncConfiguration{
    classTypeMap: { [key: string]: any };
    SetSyncalbeObject<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>, conflictsHandler?: IConflictsHandler)
}