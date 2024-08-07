import { ISyncableRepository } from "../../abstraction/data/isyncable_repository";
import { ISyncMetadata } from "../../abstraction/metadata/isync_metadata";
import { ISyncableObject } from "../../abstraction/metadata/isyncable_object";
import { SyncOperationMetadata } from "../../abstraction/models/sync_operation_metadata";
import { SyncPayload } from "../../abstraction/models/sync_payload";
import { IHttpManager } from "../../abstraction/service/ihttp_manager";
import { ISyncManager } from "../../abstraction/service/isync_manager";
import { FastSync } from "../fast_sync";
import { SyncVersionManager } from "./sync_version_manager";

export class SyncManager implements ISyncManager {
  async push(): Promise<SyncPayload> {
    const httpManager: IHttpManager = FastSync.getHttpManager();
    const payload: SyncPayload = await this._buildPayload();
    let isSucced = false;

    if (payload.hasData) {
      isSucced = await httpManager.push(payload);
    }
    if (isSucced) {
      await this._undirtyList(payload);
    }
    return payload;
  }

  async pull(): Promise<SyncPayload> {
    const httpManager: IHttpManager = FastSync.getHttpManager();
    const operationMetadata = new SyncOperationMetadata();
    const syncableTypes: string[] = FastSync.getSyncableTypes();

    for (const type of syncableTypes) {
      const syncVersionManager: SyncVersionManager =
        FastSync.getSyncVersionManager();
      const typeLocalMetadata: ISyncMetadata =
        await syncVersionManager.getTypeSyncMetadata(type);
      operationMetadata.setMetadata(type, typeLocalMetadata);
    }

    const payload: SyncPayload = await httpManager.pull(operationMetadata);
    await this._undirtyList(payload);
    await this._processPayloadMetadata(payload);
    return payload;
  }

  async sync(): Promise<SyncPayload> {
    await this.push();
    return await this.pull();
  }

  async hardReset(
    types?: Array<{ new (): ISyncableObject }>
  ): Promise<SyncPayload> {
    let syncableTypes: string[] = [];

    if (types && types.length > 0) {
      syncableTypes = types.map((type) => type.name);
    } else {
      syncableTypes = FastSync.getSyncableTypes();
    }

    for (const type of syncableTypes) {
      const repository: ISyncableRepository<ISyncableObject> =
        FastSync.getObjectRepository(type);
      await repository.hardDelete();
    }

    return await this.pull();
  }

  private _filterDirtyObjects(object: ISyncableObject): boolean {
    return object.dirty;
  }

  private async _buildPayload(): Promise<SyncPayload> {
    const syncableTypes: string[] = FastSync.getSyncableTypes();
    const payload: SyncPayload = new SyncPayload();

    for (const type of syncableTypes) {
      const repository: ISyncableRepository<ISyncableObject> =
        FastSync.getObjectRepository(type);
      const dirtyObjects: ISyncableObject[] = await repository.query(
        this._filterDirtyObjects
      );
      payload.pushObjects(type, dirtyObjects);
    }

    return payload;
  }

  private async _undirtyList(payload: SyncPayload): Promise<void> {
    const syncableTypes: string[] = payload.getSyncedTypes();

    for (const type of syncableTypes) {
      const repository: ISyncableRepository<ISyncableObject> =
        FastSync.getObjectRepository(type);
      const pushedItems: ISyncableObject[] = payload.getObjectsForType(type);
      const createFunction = FastSync.getTypeCreateFunction(type);
      let list = pushedItems.map((item) => createFunction(item));
      // for (var i = 0; i < pushedItems.length; i++) {
      //   list.push(createFunction(pushedItems[i]));
      // }
      await repository.undirtyList(list);
    }
  }

  private async _processPayloadMetadata(payload: SyncPayload): Promise<void> {
    const syncableTypes: string[] = payload.getSyncedTypes();
    const syncVersionManager: SyncVersionManager =
      FastSync.getSyncVersionManager();

    for (const type of syncableTypes) {
      const metadata: ISyncMetadata = payload.getTypeMetadata(type);
      await syncVersionManager.updateTypeSyncVersion(metadata);
    }
  }
}
