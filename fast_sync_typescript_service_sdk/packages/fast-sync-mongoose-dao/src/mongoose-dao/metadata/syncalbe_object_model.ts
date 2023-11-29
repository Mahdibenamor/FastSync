import * as mongoose from 'mongoose';

export class SyncableSchemaItemBuilder {

  static baseSchema: mongoose.Schema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.String,
      required: true,
      auto: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },
  });

  static plugMetadataSchema(obj: mongoose.Schema) {
    let schema = new mongoose.Schema();
    schema.add(this.baseSchema)
    schema.add(obj)
    return schema;
  }
}