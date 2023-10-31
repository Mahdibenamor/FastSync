import * as mongoose from 'mongoose';

export  const SyncMetadataSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
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
    timestamp: {
        type: Number,
    },
  });
  
