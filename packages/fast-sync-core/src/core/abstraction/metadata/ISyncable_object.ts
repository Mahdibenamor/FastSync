import { ISyncMetadata } from "./ISync_metadata";
import { IWithId } from "./Iwith_id";

export interface ISyncableObject extends IWithId  {
    _id:string;
    metadata: ISyncMetadata;
    deleted: boolean;
    getVersion():number;
    setVersion(version: number):number;
}
  
