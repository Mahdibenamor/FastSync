namespace fast_sync_core.abstraction.data
{
    public interface ISyncMetadata: IWithId
    {
        string SyncZone { get; set; }
        string Type { get; set; }
        int Version { get; set; }
        long Timestamp { get; set; }
        SyncOperationEnum SyncOperation { get; set; }
        string GetSyncZone();
        string ComputeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType);
    }
}
