import { SyncMetadata } from "../../implementation/metadata/syncable_metadata";
import { isNullOrUndefined } from "../../implementation/utils/utils";
import { ISyncMetadata } from "../metadata/ISync_metadata";

export class SyncOperationMetadata{
  metadata: Record<string, ISyncMetadata> = {};
    constructor(){};

  static create(operationMetadata: SyncOperationMetadata){
    let syncOperationMetadata = new SyncOperationMetadata();
    const keys = Object.keys(operationMetadata.metadata);
    for (const key of keys) {
      const value = operationMetadata.metadata[key];
      syncOperationMetadata.setMetadata(key, new SyncMetadata(value.type, value.version, value.syncZone))
    }
    
    return syncOperationMetadata;
  }

  public setMetadata(type:string, metadata:ISyncMetadata): void{
        this.metadata[type] = metadata;
  }

  public getTypeMetadata(type:string): ISyncMetadata{
    if(this.metadata.hasOwnProperty(type) && !isNullOrUndefined(this.metadata[type])){
      return this.metadata[type];
    }
  }

  public getSynckedTypes(): string[]{
   return Object.keys(this.metadata);
  }
}
