import { SyncOperationMetadata } from "../models/Sync_operation_metadata";
import { SyncPayload } from "../models/Sync_payload";

export interface ISyncManager {
  processPush(payload: SyncPayload);
  processPull(metadata: SyncOperationMetadata): Promise<SyncPayload>;
  processSync(metadata: SyncOperationMetadata): SyncPayload;
}
