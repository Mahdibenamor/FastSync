import { isNullOrUndefined } from "../../core/utils";
import { ISyncMetaData } from "../metadata/ISync_metadata";

export class SyncOperationMetada{
    metaData: Record<string, ISyncMetaData> = {};
    constructor(){};
    public setMetaData(type:string, metaData:ISyncMetaData): void{
        this.metaData[type] = metaData;
  }
  public getTypeMetaData(type:string): ISyncMetaData{
    if(this.metaData.hasOwnProperty(type) && !isNullOrUndefined(this.metaData[type])){
      return this.metaData[type];
    }
  }

  public getSynckedTypes(): string[]{
   return Object.keys(this.metaData);
  }
}
