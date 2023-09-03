export interface ISyncService{
    getLastSyncVersion(type: string): Promise<number>;
    incrementSyncVersion(type: string): Promise<number>;
}