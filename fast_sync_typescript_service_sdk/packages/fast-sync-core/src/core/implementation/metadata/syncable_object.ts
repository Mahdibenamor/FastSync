import { ISyncMetadata } from "../../abstraction/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";

export class SyncableObject implements ISyncableObject {
    public id: string;
    public metadata: ISyncMetadata;
    public deleted: boolean;
    syncOperation: SyncOperationEnum;
    constructor() {}
    
    getVersion(){
      return this.metadata.version
    }
  
    setVersion(version: number): number{
      return this.metadata.version = version;
    } 
  }