import * as mongoose from 'mongoose';

export  const SyncMetadataSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,
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
  
