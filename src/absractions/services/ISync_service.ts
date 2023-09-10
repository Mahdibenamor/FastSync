import { Constructable } from "typedi";

export interface ISyncService{
    getLastGlobalSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
    incrementGlobalSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
}