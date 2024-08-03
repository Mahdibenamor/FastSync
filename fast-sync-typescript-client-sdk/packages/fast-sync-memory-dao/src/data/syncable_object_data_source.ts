import { ISyncableDataSource } from "fast-sync-client";
import { IWithId } from "fast-sync-client";

export class SyncableObjectDataSource<T extends IWithId>
  implements ISyncableDataSource<T>
{
  private data: Map<string, T> = new Map();
  constructor() {}

  async add(entity: T): Promise<T> {
    this.data.set(entity.id, entity as T);
    return entity;
  }

  async addMany(entities: T[]): Promise<T[]> {
    for (var i = 0; i < entities.length; i++) {
      this.data.set(entities[i].id, entities[i] as T);
    }
    return entities;
  }

  async update(id: string, entity: T): Promise<T> {
    if (this.data.has(id)) {
      this.data.set(id, entity as T);
    }
    return entity;
  }

  async updateMany(entities: T[]): Promise<T[]> {
    await this.addMany(entities);
    return entities;
  }

  async syncUpdate(entities: T[]): Promise<T[]> {
    await this.updateMany(entities);
    return entities;
  }

  async hardDelete() {
    this.data.clear();
  }

  async count(): Promise<number> {
    return this.data.size;
  }

  async findById(id: string): Promise<T | null> {
    return this.data.get(id) || null;
  }

  async findByIds(ids: string[]): Promise<T[]> {
    var results = [];
    for (var i = 0; i < ids.length; i++) {
      var item = await this.findById(ids[i]);
      if (item != null) {
        results.push(item);
      }
    }
    return results;
  }

  async getAll(): Promise<T[]> {
    return Array.from(this.data.values());
  }

  async dispose(): Promise<any> {
    this.data.clear();
  }
}
