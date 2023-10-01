import { ISyncMetadata } from "../../abstraction/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";
import { isEmptyString } from "../utils/utils";

export class SyncMetadata implements ISyncMetadata{
    _id: string;
    timestamp: number;
    syncOperation: SyncOperationEnum;
    
  static create(metadata: SyncMetadata){
    let syncOperationMetadata = new SyncMetadata(metadata.type, metadata.version, metadata.selector);
    return syncOperationMetadata;
  }
    constructor(
        public type: string,
        public version: number,
        public selector:string) {}

    getSelector(){
        if(!isEmptyString(this.selector)){
            return this.selector;
        }
        throw new Error("Each SyncMetadata should have selector (unique id), it is specified when configuring SyncConfiguration object")
    }
}