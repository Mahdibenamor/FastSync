import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncPayload } from "../models/Sync_payload";

export interface ISyncManager<T extends ISyncableObject> {
    processPush(payload: SyncPayload<T>);
    processPull(payload: SyncPayload<T>): SyncPayload<T>;
    processSync(payload: SyncPayload<T>): SyncPayload<T>;
}