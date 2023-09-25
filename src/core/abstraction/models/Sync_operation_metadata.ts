import { isNullOrUndefined } from "../../utils";
import { ISyncMetadata } from "../metadata/ISync_metadata";

export class SyncOperationMetadata{
  metadata: Record<string, ISyncMetadata> = {};
    constructor(){};
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
