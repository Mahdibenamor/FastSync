import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";
import { ISyncableObject } from "../../../absractions/metadata/ISyncable_object";
import { ISyncMetaData } from "../../../absractions/metadata/ISync_metadata";

export class SyncableItem implements ISyncableObject {
  public _id: string;
  public metadata: ISyncMetaData;
  public deleted: boolean;
  constructor() {}
  
  getVersion(){
    return this.metadata.version
  }

  setVersion(version: number): number{
    return this.metadata.version = version;
  }
  
}

const SyncableSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  metadata: {
    type: JSON,
  },
  deleted: {
    type: Boolean,
  },
});

export function buildSycnableItemSchema(obj: SchemaDefinition<SchemaDefinitionType<any>> | Schema){
  let schema =  SyncableSchema.clone();
  schema.add(obj)
  return schema;
}


export class SyncMetaData {
  
}