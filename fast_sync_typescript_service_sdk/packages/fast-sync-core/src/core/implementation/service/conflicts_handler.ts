import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";
import { IConflictsHandler } from "../../abstraction/service/IConflicts_handler";
import { ConflictsResolutionStrategyEnum } from "../../abstraction/service/conflicts_resolution_strategie";
import { isNullOrUndefined } from "../utils/utils";

export class ConflictsHandler implements IConflictsHandler {

    constructor(private resolutionStrategy: ConflictsResolutionStrategyEnum = ConflictsResolutionStrategyEnum.LastWriterWins,
        private conflictsResolutionFunction?: (oblObject: ISyncableObject, newObject: ISyncableObject) => Promise<ISyncableObject>) {

        if (ConflictsResolutionStrategyEnum.PredefinedRules == this.resolutionStrategy && isNullOrUndefined(conflictsResolutionFunction)) {
            throw new Error("conflictsResolutionFunction is required when you put ConflictsResolutionStrategyEnum.PredefinedRules");
        }
    }

    public getConflictsResolutionStrategy() {
        return this.resolutionStrategy;
    }

    public async resolveConflicts(oblObject: ISyncableObject, newObject: ISyncableObject): Promise<ISyncableObject> {
        if (ConflictsResolutionStrategyEnum.LastWriterWins == this.resolutionStrategy) {
            return newObject;
        }

        if (ConflictsResolutionStrategyEnum.TimestampOrdering == this.resolutionStrategy) {
            return oblObject.metadata.timestamp > newObject.metadata.timestamp ? oblObject : newObject;
        }

        if (ConflictsResolutionStrategyEnum.PredefinedRules == this.resolutionStrategy) {
            // check if there is other then client increment, ==> some one else did change the objct
            // ==> the client is late ==> conflict
            if (Math.abs(newObject.metadata.version - oblObject.metadata.version) > 1) {
                let resolvedobject = await this.conflictsResolutionFunction(oblObject, newObject);
                resolvedobject.metadata = newObject.metadata;
                return resolvedobject
            }
            return newObject;

        }
    }
}