import { SyncOperationEnum } from "./ISync_operation";
import { IWithId } from "./Iwith_id";

export interface ISyncMetadata extends IWithId {
    _id: string;
    selector:string;
    type: string;
    version: number
    timestamp: number;
    syncOperation: SyncOperationEnum;
    getSelector();
}