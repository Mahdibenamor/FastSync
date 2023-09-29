import { ISyncMetadata } from "../../abstraction/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";

export class SyncMetadata implements ISyncMetadata{
    _id: string;
    timestamp: number;
    syncOperation: SyncOperationEnum;

    constructor(
        public type: string,
        public version: number) {}
}