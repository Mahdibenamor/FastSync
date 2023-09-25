import { SyncableObject } from "../core/implementation/metadata/syncable_object";
import {  buildSycnableItemSchema } from "../mongoose-dao/metadata/syncalbe_object_model";

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
