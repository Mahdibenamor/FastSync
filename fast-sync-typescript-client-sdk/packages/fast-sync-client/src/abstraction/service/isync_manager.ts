import { SyncPayload } from "../models/sync_payload";

export interface ISyncManager {
  push(): Promise<SyncPayload>;
  pull(): Promise<SyncPayload>;
  sync(): Promise<SyncPayload>;
  hardReset(types?: Array<new () => any>): Promise<SyncPayload>;
}
