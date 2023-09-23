import { Schema } from "mongoose";
import { ISyncMetadata } from "../../absractions/metadata/ISync_metadata";
import { SyncOperationEnum } from "../../absractions/metadata/ISync_operation";

export class SyncMetadata implements ISyncMetadata{
    public _id: string;
    public timestamp: number;
    syncOperation: SyncOperationEnum;

    constructor(
        public type: string,
        public version: number) {}
    }
  
export  const SyncMetadataSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
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
  
