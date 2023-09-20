import Container, { Constructable } from "typedi";
import { ISyncableRepository } from "../../absractions/data/ISyncable_Repository";
import { ISyncalbeDataSource } from "../../absractions/data/ISyncable_data_source";
import { SyncVersionManager } from "../services/sync_service";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";
import { isNullOrUndefined } from "../../core/utils";
import { SyncMetaData } from "../metadata/sync_metadata";
import { ISyncMetaData } from "../../absractions/metadata/ISync_metadata";


export class SyncalbeRepository<T extends ISyncableObject> implements ISyncableRepository<T>
{
  private syncService: SyncVersionManager = Container.get(SyncVersionManager);
  constructor(public dataSource: ISyncalbeDataSource<T>, private type: Constructable<T>) {}

  async add(entity: T): Promise<T> {
    return await this.dataSource.add(entity);
  }

  async update(query: any, entity: T): Promise<T | null> {
    return await this.dataSource.update(query,entity);
  }

  async findById(id: string): Promise<T> {
    return await this.dataSource.findById(id)
  }

  async getAll(): Promise<T[]> {
    return await this.dataSource.getAll()
  }

  async query(filter: any): Promise<T[]> {
    return await this.dataSource.query(filter);
  }


  async count(): Promise<number> {
    return await this.dataSource.count();
  }

  async fetchMany(metadata: ISyncMetaData): Promise<T[]> {
    let entities = await this.dataSource.fetchMany(metadata)
    return entities;
  }

  async addMany(entities: T[]): Promise<T[]> {
    let lastKnowVersion =  await this.syncService.getLastGlobalSyncVersion(this.type.name)
    entities = this.incrementObjectsVersion(entities, ++lastKnowVersion)
    entities = await this.dataSource.addMany(entities);
    await this.syncService.incrementGlobalSyncVersion(this.type.name);
    return entities;
  }

  
  async updateMany(entities: T[]): Promise<T[]> {
    let lastKnowVersion =  await this.syncService.getLastGlobalSyncVersion(this.type.name)
    entities = this.incrementObjectsVersion(entities, ++lastKnowVersion)
    entities = await this.dataSource.updateMany(entities);
    await this.syncService.incrementGlobalSyncVersion(this.type.name);
    return entities;
  }

  async removeMany(entities: T[]): Promise<T[]> {
    entities = this.doMarkObjectsAsDeleted(entities);
    entities = await this.updateMany(entities);
    return entities;
  }
  
  dispose(): void {
     this.dataSource.dispose();
  }

  private doMarkObjectsAsDeleted(entities: T[]):T[]{
    let incermentedEntities: T[]= [];
    for (let entity of entities) {
      entity.deleted = true;
      incermentedEntities.push(entity);
    }
    return incermentedEntities;
  }
  
  private incrementObjectsVersion(entities: T[], version:number){
    let incermentedEntities: T[]= [];
    for (let entity of entities) {
      if(isNullOrUndefined(entity.metadata)){
        entity.metadata = new SyncMetaData(this.type.name, version);
      }
      else{
        entity.metadata.version = version;
      }
      incermentedEntities.push(entity);
    }
    return incermentedEntities;
  }
}
