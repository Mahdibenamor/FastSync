import * as mongoose from 'mongoose';

export class SyncableSchemaItemBuilder{

  static baseSchema : mongoose.Schema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    deleted: {
      type: mongoose.Schema.Types.Boolean
    },
  }); 
  static plugMetadataSchema(obj: mongoose.SchemaDefinition<mongoose.SchemaDefinitionType<any>> | mongoose.Schema){
    let schema =  this.baseSchema.clone();
    schema.add(obj)
    return schema;
  }
}