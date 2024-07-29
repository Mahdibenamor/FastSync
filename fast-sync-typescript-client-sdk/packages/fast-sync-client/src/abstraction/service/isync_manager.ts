import { SyncPayload } from "../models/Sync_payload";

export interface ISyncManager {
  push(): Promise<SyncPayload>;
  pull(): Promise<SyncPayload>;
  sync(): Promise<SyncPayload>;
  hardReset(types?: Array<new () => any>): Promise<SyncPayload>;
}
