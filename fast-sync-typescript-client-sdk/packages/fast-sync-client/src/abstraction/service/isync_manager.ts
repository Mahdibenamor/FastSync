import { ISyncableObject } from "../metadata/isyncable_object";
import { SyncPayload } from "../models/sync_payload";

export interface ISyncManager {
  push(): Promise<SyncPayload<ISyncableObject>>;
  pull(): Promise<SyncPayload<ISyncableObject>>;
  sync(): Promise<SyncPayload<ISyncableObject>>;
  hardReset(
    types?: Array<new () => any>
  ): Promise<SyncPayload<ISyncableObject>>;
}
