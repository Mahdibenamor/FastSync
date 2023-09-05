import { ISyncMetaData } from "../metadata/ISync_metadata";

export class SyncOperationMetada{
    metaData: Record<string, ISyncMetaData> = {};
    constructor(){};
    setMetaData(type:string, metaData:ISyncMetaData){
        this.metaData[type] = metaData;
  }
}