import { ISyncableDataSource } from "../../abstraction/data/isyncable_data_source";
import { ISyncMetadata } from "../../abstraction/metadata/isync_metadata";
import { FastSync } from "../fast_sync";

export class SyncVersionManager {
  public syncMetadataDataSource: ISyncableDataSource<ISyncMetadata>;

  constructor(syncMetadataDataSource: ISyncableDataSource<ISyncMetadata>) {
    this.syncMetadataDataSource = syncMetadataDataSource;
  }

  async getTypeSyncMetadata(type: string): Promise<ISyncMetadata> {
    let metadata = await this.syncMetadataDataSource.findById(type);
    if (!metadata) {
      const typeMetadataJson = {
        syncZone: FastSync.getTypeSyncZone(type),
        type: type,
        id: type,
        version: 0,
        timestamp: Math.floor(Date.now() / 1000),
        syncOperation: 999,
      };
      metadata = await this.syncMetadataDataSource.add(
        this.buildMetadata(typeMetadataJson)
      );
    }
    return metadata;
  }

  async updateTypeSyncVersion(
    syncMetadata: ISyncMetadata
  ): Promise<ISyncMetadata> {
    syncMetadata.id = syncMetadata.type;
    syncMetadata = await this.syncMetadataDataSource.update(
      syncMetadata.id,
      syncMetadata
    );
    return syncMetadata;
  }

  async initTypeSyncMetaData(type: string): Promise<void> {
    await this.getTypeSyncMetadata(type);
  }

  async resetTypeSyncVersion(type: string): Promise<void> {
    await this.syncMetadataDataSource.hardDelete();
    await this.initTypeSyncMetaData(type);
  }

  private buildMetadata(metadataJson: any): ISyncMetadata {
    return metadataJson as ISyncMetadata;
  }
}
