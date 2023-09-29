import { SyncableObject } from "../core/implementation/metadata/syncable_object";
import {  buildSycnableItemSchema } from "../mongoose-dao/metadata/syncalbe_object_model";

export class Item extends SyncableObject {
  public name: string;
  public description: string;
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
