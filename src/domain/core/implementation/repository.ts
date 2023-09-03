import Container, { Constructable } from "typedi";
import { IRepository } from "../abstraction/irepository";
import { LocalDataSource } from "./local_data_source";

export abstract class Repository<T, V extends LocalDataSource<T>>
  implements IRepository<T>
{
  public dataSource: V;
  constructor(type: Constructable<V>) {
    this.dataSource = getInstance<V>(type);
  }

  async fetch(query: any): Promise<T[]> {
    let array: T[] = await this.dataSource.find(query);
    return array;
  }

  async save(data: T): Promise<T> {
    return await this.dataSource.save(data);
  }

  async delete(id: string): Promise<T> {
    return await this.dataSource.delete({ _id: id });
  }

  async getById(id: string): Promise<T | null> {
    return await this.dataSource.findById(id);
  }

  async getOne(query: any): Promise<T | null> {
    return await this.dataSource.findOne(query);
  }

  async update(id: string, data: T): Promise<T> {
    return await this.dataSource.update({ _id: id }, data);
  }

  async getLastItem(query: any): Promise<T[]> {
    let array: T[] = await this.dataSource.getLastItems(query);
    return array;
  }

  async distinct(field: string, query: any) {
    return await this.dataSource.distinct(field, query);
  }
}

function getInstance<T>(type: Constructable<T>): T {
  return Container.get<T>(type);
}
