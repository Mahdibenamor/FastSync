import { SyncalbeRepository } from "fast-sync-client";
import { Item } from "./item";
import { ItemDataSource } from "./item_data_source";

export class ItemRepository extends SyncalbeRepository<Item> {
  constructor() {
    super(new ItemDataSource());
  }
}
