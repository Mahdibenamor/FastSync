import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";

const SyncableSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
  deleted: {
    type: Schema.Types.Boolean
  },
});

export function buildSycnableItemSchema(obj: SchemaDefinition<SchemaDefinitionType<any>> | Schema){
  let schema =  SyncableSchema.clone();
  schema.add(obj)
  return schema;
}
