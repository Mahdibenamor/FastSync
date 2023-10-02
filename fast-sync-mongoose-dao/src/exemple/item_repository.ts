import { SyncalbeRepository } from "fast-sync-core";
import { Item } from "./item";
import { ItemDataSource } from "./item_datasource";


export class ItemRepository  extends SyncalbeRepository<Item> {
    constructor() {
        super(new ItemDataSource(),Item.name);
    }
}