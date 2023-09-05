import mongoose from "mongoose";
import { ISyncalbeDataSource } from "../../absractions/data/ISyncable_data_source";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";

export class SyncalbeDataSource<T extends ISyncableObject> implements ISyncalbeDataSource<T> {
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

  async delete(query: any): Promise<T | null> {
    return (await this.model.findOneAndDelete(query).exec())?.toObject();
  }

  async findById(id: string): Promise<T> {
    return (await this.model.findById(id).exec())?.toObject();
  }

  async getAll(): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model.find().exec();
    return array.map((item) => item.toObject());
  }

  async query(filter: any): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model.find(filter).exec();
    return array.map((item) => item.toObject());
  }

  async getById(id: string): Promise<T> {
    return (await this.model.findById(id))?.toObject();
  }

  async count(): Promise<number> {
    const count = await this.model.countDocuments();
    return count;
  }

  async addMany(entities: T[]): Promise<T[]> {
    const createdEntities = await this.model.create(entities);
    return createdEntities;
  }

  
  async updateMany(entities: T[]): Promise<T[]> {
    const bulkUpdateOperations = entities.map((entity ) => ({
      updateOne: {
        filter: { _id: entity._id },
        update: { $set: entity },
      },
    }));
    await this.model.updateMany(entities)
    return entities;
  }

  async removeMany(ids: string[]): Promise<void> {
    await this.model.deleteMany({ _id: { $in: ids } });
  }
  
  dispose(): void {
    // No specific disposal needed for Mongoose
  }
}
