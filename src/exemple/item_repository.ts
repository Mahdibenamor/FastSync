import { SyncalbeRepository } from "../core/implementation/data/syncable_object_repository";
import { Item } from "./item";
import { ItemDataSource } from "./item_datasource";


export class ItemRepository  extends SyncalbeRepository<Item> {
    constructor() {
        super(new ItemDataSource(),Item);
    }
}