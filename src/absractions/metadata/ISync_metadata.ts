import { IWithId } from "./Iwith_id";

export interface ISyncMetaData extends IWithId {
    _id: string;
    type: string;
    version: number
    changeTime: Date;
}