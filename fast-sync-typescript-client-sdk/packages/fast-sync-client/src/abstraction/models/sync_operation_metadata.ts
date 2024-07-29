import { SyncMetadata } from "../../implementation/metadata/syncable_metadata";
import { isNullOrUndefined } from "../../implementation/utils/utils";
import { ISyncMetadata } from "../metadata/ISync_metadata";

export class SyncOperationMetadata {
  metadata: Record<string, ISyncMetadata> = {};
  constructor() {}

  static create(operationMetadata: SyncOperationMetadata) {
    let syncOperationMetadata = new SyncOperationMetadata();
    const keys = Object.keys(operationMetadata.metadata);
    for (const key of keys) {
      const value = operationMetadata.metadata[key];
      let syncMetadata = new SyncMetadata(
        value.type,
        value.version,
        value.syncZone
      );
      syncMetadata.id = value.id;
      syncMetadata.syncOperation = value.syncOperation;
      syncMetadata.timestamp = value.timestamp;
      syncOperationMetadata.setMetadata(key, syncMetadata);
    }

    return syncOperationMetadata;
  }

  public setMetadata(type: string, metadata: ISyncMetadata): void {
    this.metadata[type] = metadata;
  }

  public getTypeMetadata(type: string): ISyncMetadata {
    if (
      this.metadata.hasOwnProperty(type) &&
      !isNullOrUndefined(this.metadata[type])
    ) {
      return this.metadata[type];
    }
    throw new Error(
      "metadata of each syncked type should specified, please check how you build SyncOperationMetadata"
    );
  }

  public getSynckedTypes(): string[] {
    return Object.keys(this.metadata);
  }
}
