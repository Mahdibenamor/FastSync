import * as mongoose from 'mongoose';
import { ISyncalbeDataSource } from "fast-sync-core"
import { IWithId } from "fast-sync-core"
import { ISyncMetadata } from "fast-sync-core"

export class SyncalbeObjectDataSource<T extends IWithId> implements ISyncalbeDataSource<T> {
  model: mongoose.Model<T & mongoose.Document>;

  constructor(schema: mongoose.Schema, collection: string) {
    this.model = mongoose.model<T & mongoose.Document>(collection, schema);
  }

  async add(entity: T): Promise<T> {
    return (await this.model.create(entity))?.toObject();
  }

  async update(query: any, entity: T): Promise<T | null> {
    return (
      await this.model.findOneAndUpdate(query, entity, { new: true }).exec()
    )?.toObject();
  }

  async delete(query: any): Promise<void> {
    await this.model.findOneAndDelete(query).exec();
  }

  async findById(id: string): Promise<T> {
    return (await this.model.findById(id).exec())?.toObject();
  }

  async getAll(): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model.find().exec();
    return array.map((item) => item.toObject());
  }


  async getById(id: string): Promise<T> {
    return (await this.model.findById(id))?.toObject();
  }

  async count(): Promise<number> {
    const count = await this.model.countDocuments();
    return count;
  }

  async query(query: any): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model.find(query).exec();
    return array.map((item) => item.toObject());
  }

  async addMany(entities: T[]): Promise<T[]> {
    const createdEntities = await this.model.create(entities);
    return createdEntities;
  }


  async updateMany(entities: T[]): Promise<T[]> {
    let bulk = [];
    entities.forEach(entity => {
      bulk.push({
        updateOne: {
          filter: { id: Object(entity.id) },
          update: { $set: entity },
          upsert: true
        },
      })
    })
    await this.model.bulkWrite(bulk)
    return entities;
  }

  async fetchMany(syncMetadata: ISyncMetadata): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model.find({
      'metadata.version': { $gt: syncMetadata.version },
      'metadata.syncZone': syncMetadata.getSyncZone()
    }).exec();
    return array.map((item) => item.toObject());
  }


  dispose(): void {
    // No specific disposal needed for Mongoose
  }
}
