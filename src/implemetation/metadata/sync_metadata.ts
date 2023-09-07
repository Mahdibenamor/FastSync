import { Schema } from "mongoose";
import { ISyncMetaData } from "../../absractions/metadata/ISync_metadata";

export class SyncMetaData implements ISyncMetaData{
    public _id: string;
    public type: string;
    public version: number;
    public changeTime: Date;
    constructor() {}
  }
  
export  const SyncMetaDataSchema = new Schema({
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
  
