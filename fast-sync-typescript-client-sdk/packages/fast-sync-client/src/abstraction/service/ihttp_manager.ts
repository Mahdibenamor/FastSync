import { SyncOperationMetadata } from "../models/Sync_operation_metadata";
import { SyncPayload } from "../models/Sync_payload";

export interface IHttpManager {
  push(payload: SyncPayload): Promise<boolean>;
  pull(metadata: SyncOperationMetadata): Promise<SyncPayload>;
}
