import { SyncableObject } from "fast-sync-core";
import { Schema } from "mongoose";

export class Item extends SyncableObject {
  public name: string;
  public description: string;
  public id: string;
  constructor() {
      super(); 
  }
}

var entrepreneurSchema   = new Schema({
  name: {
    type: Schema.Types.String
},
description: {
  type: Schema.Types.String
} });




// export const  ItemSchema = buildSycnableItemSchema({
//   name: {
//       type: mon.Schema.Types.String
//   },
//   description: {
//     type: mon.Schema.Types.String
//   }  
// }); 
