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

    public async resolveConflicts(serverObject: ISyncableObject, clientObject: ISyncableObject): Promise<ISyncableObject> {
        if (ConflictsResolutionStrategyEnum.LastWriterWins == this.resolutionStrategy) {
            return clientObject;
        }

        if (ConflictsResolutionStrategyEnum.TimestampOrdering == this.resolutionStrategy) {
            return serverObject.metadata.timestamp > clientObject.metadata.timestamp ? serverObject : clientObject;
        }

        if (ConflictsResolutionStrategyEnum.PredefinedRules == this.resolutionStrategy) {
            // check if there is other then client increment, ==> some one else did change the objct
            // ==> the client is late ==> conflict
            let clientVersion: number = clientObject.metadata.version;
            let serverVersion: number = serverObject.metadata.version;
            if (Math.abs(clientVersion - serverVersion) != 1 && serverVersion >= clientVersion) {
                let resolvedobject = await this.conflictsResolutionFunction(serverObject, clientObject);
                resolvedobject.metadata = clientObject.metadata;
                return resolvedobject
            }
            return clientObject;

        }
    }
}