import { ISyncableObject } from "../metadata/ISyncable_object";
import { IConflictsHandler } from "./IConflicts_handler";
import { ISyncableRepository } from "../data/ISyncable_Repository";
import { SyncZoneConfiguration } from "../models/Sync_zone_configuration";

export interface ISyncConfiguration{
    setSyncalbeObject<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>, syncZoneConfiguration?: SyncZoneConfiguration, conflictsHandler?: IConflictsHandler);
    setObjectRepository<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>);
    setObjectConflictsHandler(entityType: string,  conflictsHandler: IConflictsHandler);
    getObjectConflictsHandler(type:string): IConflictsHandler;
    getObjectRepository<T extends ISyncableObject>(type: string): ISyncableRepository<T>;
}