import { Constructable } from "typedi";
import { ISyncMetaData } from "../metadata/ISync_metadata";

export interface ISyncService{
    getLastSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
    incrementSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
}