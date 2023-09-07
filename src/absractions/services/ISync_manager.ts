import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncPayload } from "../models/Sync_payload";

export interface ISyncManager<T extends ISyncableObject> {
    push(payload: SyncPayload<T>);
    pull(payload: SyncPayload<T>): SyncPayload<T>;
    sync(payload: SyncPayload<T>): SyncPayload<T>;
}