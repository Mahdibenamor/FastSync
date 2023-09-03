import mongoose from "mongoose";
import { IlocalDataSource } from "../../../absractions/ilocal_data_source";

export class LocalDataSource<T> implements IlocalDataSource<T> {
  model: mongoose.Model<T & mongoose.Document>;

  constructor(schema: mongoose.Schema, collection: string) {
    this.model = mongoose.model<T & mongoose.Document>(collection, schema);
  }

  async find(query: any): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model.find(query).exec();
    return array.map((item) => item.toObject());
  }

  async findOne(query: any): Promise<T | null> {
    return (await this.model.findOne(query).exec())?.toObject();
  }

  async save(data: T): Promise<T> {
    return (await this.model.create(data))?.toObject();
  }

  async findById(id: string): Promise<T> {
    return (await this.model.findById(id).exec())?.toObject();
  }

  async update(query: any, data: any): Promise<T> {
    return (
      await this.model.findOneAndUpdate(query, data, { new: true }).exec()
    )?.toObject();
  }

  async delete(query: any): Promise<T> {
    return (await this.model.findOneAndDelete(query).exec())?.toObject();
  }

  async distinct(field: string, query: any): Promise<T[]> {
    return await this.model.distinct(field, query).exec();
  }

  async getLastItems(query: any): Promise<T[]> {
    let array: mongoose.Document<T>[] = await this.model
      .find(query)
      .limit(1)
      .sort({ $natural: -1 })
      .exec();
    return array.map((item) => item.toObject());
  }
}
