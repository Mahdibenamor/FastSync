import { SyncOperationMetadata } from "../models/sync_operation_metadata";
import { SyncPayload } from "../models/sync_payload";

export interface IHttpManager {
  push(payload: SyncPayload): Promise<boolean>;
  pull(metadata: SyncOperationMetadata): Promise<SyncPayload>;
}
