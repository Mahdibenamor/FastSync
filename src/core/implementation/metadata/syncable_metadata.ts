import { Constants } from "../../abstraction/constants";
import { ISyncMetadata } from "../../abstraction/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";
import { SyncZoneRestrictionEnum } from "../../abstraction/models/Sync_zone_restriction";

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
          return this.syncZone;
      }

    computeSyncZone(syncZoneRestrictionType: SyncZoneRestrictionEnum){
      if(syncZoneRestrictionType == SyncZoneRestrictionEnum.restricted)
      return this.syncZone;
    else 
      return Constants.globalSyncZoneRestriction;
    }
}