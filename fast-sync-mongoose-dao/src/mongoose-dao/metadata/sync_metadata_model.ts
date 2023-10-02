import { Schema } from "mongoose";

export  const SyncMetadataSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    syncZone: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
    },
    version: {
        type: Number,
    },
    changeTime: {
        type: Date,
    },
  });
  
