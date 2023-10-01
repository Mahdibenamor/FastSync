
export interface ISyncVersionManager {
    getLastSyncVersion(entityType: string, selector: string): Promise<number>;
    incrementSyncVersion(entityType: string, selector: string): Promise<number>;
}