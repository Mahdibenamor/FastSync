import { Constructable } from "typedi";

export interface ISyncVersionManager {
    getLastGlobalSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
    incrementGlobalSyncVersion<T>(entityType: Constructable<T>): Promise<number>;
}