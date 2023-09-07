import { SyncableObject, buildSycnableItemSchema } from "./metadata/sync_metadata/syncalbe_object";

export class Item extends SyncableObject {
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
