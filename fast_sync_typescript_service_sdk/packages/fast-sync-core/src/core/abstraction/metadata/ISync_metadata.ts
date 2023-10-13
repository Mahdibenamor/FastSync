import { SyncZoneRestrictionEnum } from "../models/Sync_zone_restriction";
import { SyncOperationEnum } from "./ISync_operation";
import { IWithId } from "./Iwith_id";

export interface ISyncMetadata extends IWithId {
    id: string;
    syncZone:string;
    type: string;
    version: number
    timestamp: number;
    syncOperation: SyncOperationEnum;
    getSyncZone();
    computeSyncZone(syncZoneRestrictionType: SyncZoneRestrictionEnum)
}