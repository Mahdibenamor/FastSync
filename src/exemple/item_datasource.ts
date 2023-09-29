import { SyncalbeObjectDataSource } from "../mongoose-dao/data/syncable_object_data_source";
import { Item, ItemSchema } from "./item";


export class ItemDataSource  extends SyncalbeObjectDataSource<Item> {
    constructor() {
        super(ItemSchema, Item.name);
    }
}