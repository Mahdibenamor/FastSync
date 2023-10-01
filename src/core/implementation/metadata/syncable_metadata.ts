import { ISyncMetadata } from "../../abstraction/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";
import { isEmptyString } from "../utils/utils";

export class SyncMetadata implements ISyncMetadata{
    _id: string;
    timestamp: number;
    syncOperation: SyncOperationEnum;
    
  static create(metadata: SyncMetadata){
    let syncOperationMetadata = new SyncMetadata(metadata.type, metadata.version, metadata.syncZone);
    return syncOperationMetadata;
  }
    constructor(
        public type: string,
        public version: number,
        public syncZone:string) {}

      getSyncZone(){
        if(!isEmptyString(this.syncZone)){
            return this.syncZone;
        }
        throw new Error("Each SyncMetadata should have syncZone (unique id), it is specified when configuring SyncConfiguration object")
    }
}