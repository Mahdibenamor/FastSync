import { FastSync } from "../../implementation/fast_sync";
import { ISyncMetadata } from "../metadata/isync_metadata";
import { ISyncableObject } from "../metadata/isyncable_object";
import { SyncOperationMetadata } from "./sync_operation_metadata";

export class SyncPayload<T extends ISyncableObject> {
  private _data: Map<string, T[]>;
  operationMetadata: SyncOperationMetadata;
  hasData: boolean = false;

  constructor(
    data?: Map<string, T[]>,
    operationMetadata?: SyncOperationMetadata
  ) {
    this._data = data ?? new Map<string, T[]>();
    this.operationMetadata = operationMetadata ?? new SyncOperationMetadata();
  }

  pushObjects(type: string, entities: T[]): void {
    if (entities.length > 0) {
      const typeMetadataJson = {
        syncZone: FastSync.getTypeSyncZone(type),
        type: type,
        id: "id",
        version: 999,
        timestamp: 999,
        syncOperation: 999,
      };
      this.operationMetadata.setMetadata(
        type,
        this.buildMetadata(typeMetadataJson)
      );
      this._data.set(type, entities);
      this.hasData = true;
    }
  }

  getObjectsForType(type: string): T[] {
    return this._data.get(type) ?? [];
  }

  getSyncedTypes(): string[] {
    return Array.from(this._data.keys());
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
