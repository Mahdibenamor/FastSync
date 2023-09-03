import Container, { Constructable } from "typedi";
import { ISyncableRepository } from "../../absractions/data/ISyncable_Repository";
import { ISyncalbeDataSource } from "../../absractions/data/ISyncable_data_source";
import { SyncService } from "../services/sync_service";

export abstract class SyncalbeRepository<T> implements ISyncableRepository<T>
{

  private syncService: SyncService = Container.get(SyncService);
  constructor(public dataSource: ISyncalbeDataSource<T>) {}

  async add(entity: T): Promise<T> {
    return await this.dataSource.add(entity);
  }

  async update(query: any, entity: T): Promise<T | null> {
    return await this.dataSource.update(query,entity);
  }

  async delete(query: any): Promise<T | null> {
    return await this.dataSource.delete(query);
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
    return await this.dataSource.addMany(entities);
  }

  
  async updateMany(entities: { id: string; entity: Partial<T> }[]): Promise<T[]> {
    return await this.dataSource.updateMany(entities)
  }

  async removeMany(ids: string[]): Promise<void> {
    await this.dataSource.removeMany(ids);
  }
  
  dispose(): void {
     this.dataSource.dispose();
  }
}


function typeAsParam<T>(type: Constructable<T>){
  return type.name;
}