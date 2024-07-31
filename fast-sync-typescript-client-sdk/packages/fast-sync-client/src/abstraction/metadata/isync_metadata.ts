import { SyncZoneRestrictionEnum } from "../models/sync_zone_restriction";
import { SyncOperationEnum } from "./isync_operation";
import { IWithId } from "./iwith_id";

export interface ISyncMetadata extends IWithId {
  id: string;
  syncZone: string;
  type: string;
  version: number;
  timestamp: number;
  syncOperation: SyncOperationEnum;
  getSyncZone();
  computeSyncZone(syncZoneRestrictionType: SyncZoneRestrictionEnum);
}
