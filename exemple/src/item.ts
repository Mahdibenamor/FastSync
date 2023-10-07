import { SyncableObject } from "fast-sync-core";
import { SyncableSchemaItemBuilder } from "fast-sync-mongoose-dao";
import * as mongoose from 'mongoose';


export class Item extends SyncableObject {
  public name: string;
  public description: string;
  public id: string;
  constructor() {
      super(); 
  }
}

export const  ItemSchema =  SyncableSchemaItemBuilder.plugMetadataSchema(new mongoose.Schema({
  name: {
      type: mongoose.Schema.Types.String
  },
  description: {
    type: mongoose.Schema.Types.String
  }  
})); 