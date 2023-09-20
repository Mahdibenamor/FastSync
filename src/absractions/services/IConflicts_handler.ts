import { ISyncableObject } from "../metadata/ISyncable_object";

export interface IConflictsHandler{
    resolveConflicts(oblObject: ISyncableObject, newObject:ISyncableObject);

}


