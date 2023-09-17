import { SyncableObject, buildSycnableItemSchema } from "../implemetation/metadata/syncalbe_object";

export class Item extends SyncableObject {
    public content: string;
    constructor() {
      super(); 
    }
}

export const  ItemSchema = buildSycnableItemSchema({
  name: {
      type: String
  },
  description: {
    type: String,
  }  
}); 
