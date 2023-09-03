export interface ISyncMetaData {
    _id: string;
    type: string;
    version: number
    remoteVersion: number
    changeTime: Date;
}