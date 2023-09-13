import { ISyncMetaData } from "./ISync_metadata";
import { SyncOperationEnum } from "./ISync_operation";
import { IWithId } from "./Iwith_id";

export interface ISyncableObject extends IWithId  {
    _id:string;
    metadata: ISyncMetaData;
    syncOperation: SyncOperationEnum;
    deleted: boolean;
    getVersion():number;
    setVersion(version: number):number;
}
  
