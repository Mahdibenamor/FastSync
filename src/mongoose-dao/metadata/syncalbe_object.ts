import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";
import { ISyncMetadata } from "../../core/abstraction/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../core/abstraction/metadata/ISync_operation";
import { ISyncableObject } from "../../core/abstraction/metadata/ISyncable_object";

export class SyncableObject implements ISyncableObject {
  public _id: string;
  public metadata: ISyncMetadata;
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
