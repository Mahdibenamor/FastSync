import Container, { Constructable } from "typedi";
import { ISyncableRepository } from "../../absractions/data/ISyncable_Repository";
import { ISyncalbeDataSource } from "../../absractions/data/ISyncable_data_source";
import { SyncService } from "../services/sync_service";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";

export abstract class SyncalbeRepository<T extends ISyncableObject> implements ISyncableRepository<T>
{

  private syncService: SyncService = Container.get(SyncService);
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

  async addMany(entities: T[]): Promise<T[]> {
    let lastKnowVersion =  await this.syncService.getLastSyncVersion(this.type)
    entities = this.incrementObjectsVersion(entities, ++lastKnowVersion)
    entities = await this.dataSource.addMany(entities);
    await this.syncService.incrementSyncVersion(this.type);
    return entities;
  }

  
  async updateMany(entities: T[]): Promise<T[]> {
    let lastKnowVersion =  await this.syncService.getLastSyncVersion(this.type)
    entities = this.incrementObjectsVersion(entities, ++lastKnowVersion)
    entities = await this.dataSource.updateMany(entities);
    await this.syncService.incrementSyncVersion(this.type);
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
      entity.metadata.version = version;
      incermentedEntities.push(entity);
    }
    return incermentedEntities;
  }
}
