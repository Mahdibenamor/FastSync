
export interface ISyncVersionManager {
    getLastGlobalSyncVersion(entityType: string): Promise<number>;
    incrementGlobalSyncVersion(entityType: string): Promise<number>;
}