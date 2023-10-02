
export interface ISyncVersionManager {
    getLastSyncVersion(entityType: string, syncZone: string): Promise<number>;
    incrementSyncVersion(entityType: string, syncZone: string): Promise<number>;
}