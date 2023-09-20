import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";
import { IConflictsHandler } from "../../absractions/services/IConflicts_handler";
import { ConflictsResolutionStrategyEnum } from "../../absractions/services/conflicts_resolution_strategie";

export class ConflictsHandler implements IConflictsHandler{
    constructor(private resolutionStrategy: ConflictsResolutionStrategyEnum){

    }

    resolveConflicts(oblObject: ISyncableObject, newObject: ISyncableObject) {
        if(ConflictsResolutionStrategyEnum.LastWriterWins == this.resolutionStrategy){
            return newObject;
        }

        if(ConflictsResolutionStrategyEnum.TimestampOrdering == this.resolutionStrategy){
            return newObject;
        }
    }

}