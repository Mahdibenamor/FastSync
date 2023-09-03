import { ISyncMetaData } from "./ISync_metadata";

export interface ISyncableObject {
    _id:string;
    metadata: ISyncMetaData;
    deleted: boolean;
    getVersion():number;
    setVersion(version: number):number;


}
  
