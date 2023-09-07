import { SyncableObject, buildSycnableItemSchema } from "../implemetation/metadata/syncalbe_object";

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
