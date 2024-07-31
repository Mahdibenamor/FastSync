import { FastSync } from "../../implementation/fast_sync";
import { SyncMetadata } from "../../implementation/metadata/syncable_metadata";
import { ISyncMetadata } from "../metadata/isync_metadata";
import { ISyncableObject } from "../metadata/isyncable_object";
import { SyncOperationMetadata } from "./sync_operation_metadata";

export class SyncPayload {
  public data: Map<string, any[]>;
  operationMetadata: SyncOperationMetadata;
  hasData: boolean = false;

  static create(syncPayload: SyncPayload) {
    let payload = new SyncPayload();
    payload.data = syncPayload.data;
    payload.operationMetadata = SyncOperationMetadata.create(
      syncPayload.operationMetadata
    );
    return payload;
  }

  constructor(
    data?: Map<string, any[]>,
    operationMetadata?: SyncOperationMetadata
  ) {
    this.data = data ?? new Map<string, any[]>();
    this.operationMetadata = operationMetadata ?? new SyncOperationMetadata();
  }

  pushObjects<T extends ISyncableObject>(type: string, entities: T[]): void {
    if (entities.length > 0) {
      let syncMetadata = new SyncMetadata(
        type,
        999,
        FastSync.getTypeSyncZone(type)
      );
      this.operationMetadata.setMetadata(
        type,
        this.buildMetadata(syncMetadata)
      );
      this.data.set(type, entities);
      this.hasData = true;
    }
  }

  getObjectsForType(type: string): any[] {
    return this.data.get(type) ?? [];
  }

  getSyncedTypes(): string[] {
    return Array.from(this.data.keys());
  }

  getTypeMetadata(type: string): ISyncMetadata {
    return this.operationMetadata.getTypeMetadata(type);
  }

  private buildMetadata(metadataJson: { [key: string]: any }): ISyncMetadata {
    // Assuming the implementation of buildMetadata is defined elsewhere in your codebase
    // Replace this with the actual implementation
    return metadataJson as ISyncMetadata;
  }
}
