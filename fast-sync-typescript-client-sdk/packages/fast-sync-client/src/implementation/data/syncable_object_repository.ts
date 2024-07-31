import { FastSync } from "../fast_sync";
import { ISyncMetadata } from "../../abstraction/metadata/isync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/isync_operation";
import { ISyncableDataSource } from "../../abstraction/data/isyncable_data_source";
import { ISyncableRepository } from "../../abstraction/data/isyncable_repository";
import { ISyncableObject } from "../../abstraction/metadata/isyncable_object";

export class SyncalbeRepository<T extends ISyncableObject>
  implements ISyncableRepository<T>
{
  private dataSource: ISyncableDataSource<T>;

  constructor(dataSource: ISyncableDataSource<T>) {
    this.dataSource = dataSource;
  }

  get syncMetadataDataSource(): ISyncableDataSource<ISyncMetadata> {
    return FastSync.getsyncMetadataDataSource();
  }

  async add(entity: T): Promise<T> {
    const type = "";
    entity.metadata.syncOperation = SyncOperationEnum.add;
    entity.metadata.type = type;
    entity.metadata.syncZone = FastSync.getTypeSyncZone(type);
    entity = this._dirtyObject(entity);
    entity = this._linkMetadataId(entity, entity.metadata);
    await this.syncMetadataDataSource.add(entity.metadata);
    return await this.dataSource.add(entity);
  }

  async addMany(entities: T[], metadata: ISyncMetadata): Promise<T[]> {
    const entitiesToSave: T[] = [];
    const metadataTosave: ISyncMetadata[] = [];
    const type = "";

    for (let entity of entities) {
      entity.metadata.syncOperation = SyncOperationEnum.add;
      entity.metadata.type = type;
      entity.metadata.syncZone = FastSync.getTypeSyncZone(type);
      entity = this._dirtyObject(entity);
      entity = this._linkMetadataId(entity, entity.metadata);
      entitiesToSave.push(entity);
      metadataTosave.push(entity.metadata);
    }

    await this.syncMetadataDataSource.addMany(metadataTosave);
    return await this.dataSource.addMany(entitiesToSave);
  }

  async count(): Promise<number> {
    return await this.dataSource.count();
  }

  async dispose(): Promise<void> {
    return await this.dataSource.dispose();
  }

  async findById(id: string): Promise<T | null> {
    const item = await this.dataSource.findById(id);
    if (!item) return null;

    const metadata = await this.syncMetadataDataSource.findById(
      item.metadataId
    );
    if (!metadata || item.deleted) return null;

    item.metadata = metadata;
    return item;
  }

  async getAll(): Promise<T[]> {
    let items = await this.dataSource.getAll();
    items = items.filter(this._undoRemovedEntities);

    const metadataIds = items.map((item) => item.metadataId);
    const metadatas = await this.syncMetadataDataSource.findByIds(metadataIds);
    const metadataDict = this.createDict(metadatas);

    return items.map((item) => {
      item.metadata = metadataDict[item.metadataId];
      return item;
    });
  }

  async query(query: (item: T) => boolean): Promise<T[]> {
    const items = await this.getAll();
    return items.filter(query);
  }

  async removeMany(entities: T[], metadata: ISyncMetadata): Promise<T[]> {
    const entitiesToSave: T[] = [];
    const metadataTosave: ISyncMetadata[] = [];
    const type = "";

    for (let entity of entities) {
      entity.deleted = true;
      entity.metadata.syncOperation = SyncOperationEnum.delete;
      entity.metadata.type = type;
      entity = this._dirtyObject(entity);
      entity = this._linkMetadataId(entity, entity.metadata);
      entitiesToSave.push(entity);
      metadataTosave.push(entity.metadata);
    }

    await this.syncMetadataDataSource.updateMany(metadataTosave);
    return await this.dataSource.updateMany(entitiesToSave);
  }

  async update(entity: T): Promise<T> {
    const type = "";
    entity.metadata.syncOperation = SyncOperationEnum.update;
    entity.metadata.type = type;
    entity = this._dirtyObject(entity);
    entity = this._linkMetadataId(entity, entity.metadata);
    await this.syncMetadataDataSource.update(
      entity.metadata.id,
      entity.metadata
    );
    return await this.dataSource.update(entity.id, entity);
  }

  async updateMany(entities: T[], metadata: ISyncMetadata): Promise<T[]> {
    const entitiesToSave: T[] = [];
    const metadataTosave: ISyncMetadata[] = [];
    const type = "";

    for (let entity of entities) {
      entity.metadata.syncOperation = SyncOperationEnum.update;
      entity.metadata.type = type;
      entity = this._dirtyObject(entity);
      entity = this._linkMetadataId(entity, entity.metadata);
      entitiesToSave.push(entity);
      metadataTosave.push(entity.metadata);
    }

    await this.syncMetadataDataSource.updateMany(metadataTosave);
    return await this.dataSource.updateMany(entitiesToSave);
  }

  async undirtyList(entities: T[]): Promise<T[]> {
    const entitiesToSave: T[] = [];
    const metadataTosave: ISyncMetadata[] = [];

    for (let entity of entities) {
      entity.dirty = false;
      entity = this._linkMetadataId(entity, entity.metadata);
      entitiesToSave.push(entity);
      metadataTosave.push(entity.metadata);
    }

    await this.dataSource.syncUpdate(entitiesToSave);
    await this.syncMetadataDataSource.syncUpdate(metadataTosave);
    return entitiesToSave;
  }

  async hardDelete(): Promise<void> {
    const type = "";
    const versionManager = FastSync.getSyncVersionManager();
    await this.dataSource.hardDelete();
    await versionManager.resetTypeSyncVersion(type);
  }

  private _undoRemovedEntities(entity: T): boolean {
    return !entity.deleted;
  }

  private _dirtyObject(object: T): T {
    if (!object.dirty) {
      object.dirty = true;
      object.metadata.version++;
    }
    return object;
  }

  private _linkMetadataId(object: T, metadata: ISyncMetadata): T {
    object.metadataId = metadata.id;
    return object;
  }

  private createDict(metadatas: ISyncMetadata[]): {
    [key: string]: ISyncMetadata;
  } {
    const dict: { [key: string]: ISyncMetadata } = {};
    metadatas.forEach((metadata) => {
      dict[metadata.id] = metadata;
    });
    return dict;
  }
}
