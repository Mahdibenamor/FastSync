import { ISyncableObject } from "../metadata/ISyncable_object";
import { IConflictsHandler } from "./IConflicts_handler";
import { ISyncableRepository } from "../data/ISyncable_Repository";
import { SyncZoneRestrictionEnum } from "../models/Sync_zone_restriction";

export interface ISyncConfiguration{
    setSyncalbeObject<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>, syncZoneRestriction?: SyncZoneRestrictionEnum, conflictsHandler?: IConflictsHandler);
    setObjectRepository<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>);
    setObjectConflictsHandler(entityType: string,  conflictsHandler: IConflictsHandler);
    getObjectConflictsHandler(type:string): IConflictsHandler;
    getObjectRepository<T extends ISyncableObject>(type: string): ISyncableRepository<T>;
}