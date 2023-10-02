import { SyncableObject } from "fast-sync-core";
import {  buildSycnableItemSchema } from "../mongoose-dao/metadata/syncalbe_object_model";

export class Item extends SyncableObject {
  public name: string;
  public description: string;
  public id: string;
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
