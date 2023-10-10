import { SyncalbeObjectDataSource } from "fast-sync-mongoose-dao";
import { Item, ItemSchema } from "./item";

export class ItemDataSource  extends SyncalbeObjectDataSource<Item> {
    constructor() {
        super(ItemSchema, Item.name);
    }
}