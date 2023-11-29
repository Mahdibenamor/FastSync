import * as mongoose from 'mongoose';

export  const SyncMetadataSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,
        required: true,
        auto: true,
    },
    syncZone: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
  });
  
