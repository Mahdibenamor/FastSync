import { Constructable } from "typedi";

export interface ISyncService{
    getLastSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
    incrementSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
}