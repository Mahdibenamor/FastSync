import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";

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
