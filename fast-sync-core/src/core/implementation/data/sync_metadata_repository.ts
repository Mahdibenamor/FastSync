import { ISyncalbeDataSource } from "../../abstraction/data/ISyncable_data_source";
import { IBaseRepository } from "../../abstraction/data/base_repository";
import { IWithId } from "../../abstraction/metadata/Iwith_id";

export class SyncalbeMetadataRepository<T extends IWithId> implements IBaseRepository<T>
{
  constructor(public dataSource: ISyncalbeDataSource<T>) {}

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

  dispose(): void {
    this.dataSource.dispose();
 }
}
