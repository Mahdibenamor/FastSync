import Container, { Constructable } from "typedi";
import { SyncVersionManager } from "../service/sync_service";
import { createDict, isNullOrUndefined } from "../../utils";
import { ISyncMetadata } from "../../abstraction/metadata/ISync_metadata";
import { ConflictsResolutionStrategyEnum } from "../../abstraction/service/conflicts_resolution_strategie";
import { IConflictsHandler } from "../../abstraction/service/IConflicts_handler";
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";
import { ISyncableRepository } from "../../abstraction/data/ISyncable_Repository";
import { ISyncalbeDataSource } from "../../abstraction/data/ISyncable_data_source";
import { SyncMetadata } from "../../../mongoose-dao/metadata/sync_metadata";


export class SyncalbeRepository<T extends ISyncableObject> implements ISyncableRepository<T>
{
  private syncService: SyncVersionManager = Container.get(SyncVersionManager);
  constructor(public dataSource: ISyncalbeDataSource<T>, private type: Constructable<T>, private conflictsHandler:IConflictsHandler) {}

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

  private async getObjectsByIds(ids: string[]):Promise<T[]>{
    return await this.query({ _id: { $in: ids } });
 }

  async fetchMany(metadata: ISyncMetadata): Promise<T[]> {
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
    let mergedList :T[] = [];
    mergedList = await this.doResolveConflictsObject(entities);
    let lastKnowVersion =  await this.syncService.getLastGlobalSyncVersion(this.type.name)
    entities = this.incrementObjectsVersion(entities, ++lastKnowVersion)
    entities = await this.dataSource.updateMany(mergedList);
    await this.syncService.incrementGlobalSyncVersion(this.type.name);
    return entities;
  }

  async doResolveConflictsObject(newObjects: T[]): Promise<T[]> {
    let result :T[] = [];
    let oldObjects =await this.getObjectsByIds(newObjects.map(obj => obj._id));
    result = await this.resolveConflicts(oldObjects,newObjects)
    return result;
  }

  async removeMany(entities: T[]): Promise<T[]> {
    let lastKnowVersion =  await this.syncService.getLastGlobalSyncVersion(this.type.name)
    entities = this.incrementObjectsVersion(entities, ++lastKnowVersion)
    entities = this.doMarkObjectsAsDeleted(entities);
    entities = await this.updateMany(entities);
    return entities;
  }

  private doMarkObjectsAsDeleted(entities: T[]):T[]{
    let incermentedEntities: T[]= [];
    for (let entity of entities) {
      entity.deleted = true;
      incermentedEntities.push(entity);
    }
    return incermentedEntities;
  }

  private async resolveConflicts(oldList: T[], newList :T[]):Promise<T[]>{
    if(this.conflictsHandler.getConflictsResolutionStrategy() == ConflictsResolutionStrategyEnum.LastWriterWins){
      return newList;
    }

    let newListDict = createDict(newList);
    let oldListDict = createDict(oldList);
    let mergingResult: T[] = [];

    for (const id in newListDict) {
      if (oldListDict.hasOwnProperty(id)) {
        let result = await this.conflictsHandler.resolveConflicts(oldListDict[id],newListDict[id]);
        mergingResult.push(result)
      }
      else{
        mergingResult.push(newListDict[id])
      }
    }
    return mergingResult;
  }
  
  private incrementObjectsVersion(entities: T[], version:number){
    let incermentedEntities: T[]= [];
    for (let entity of entities) {
      if(isNullOrUndefined(entity.metadata)){
        entity.metadata = new SyncMetadata(this.type.name, version);
      }
      else{
        entity.metadata.version = version;
      }
      incermentedEntities.push(entity);
    }
    return incermentedEntities;
  }
 
  dispose(): void {
    this.dataSource.dispose();
  }
}