import { SyncableItem, buildSycnableItemSchema } from "./metadata/sync_metadata/syncalbe_item";

export class Item extends SyncableItem {
    public content: string;
    constructor() {
      super(); 
    }
}

export const  schema = buildSycnableItemSchema({
    content: {
      type: String,
    },
  }); 
