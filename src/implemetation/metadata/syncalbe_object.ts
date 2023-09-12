import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";
import { ISyncMetaData } from "../../absractions/metadata/ISync_metadata";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";

export class SyncableObject implements ISyncableObject {
  public _id: string;
  public metadata: ISyncMetaData;
  public deleted: boolean;
  syncOperation: SyncOperationEnum;
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
