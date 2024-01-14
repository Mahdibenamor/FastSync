namespace fast_sync_core.abstraction.data
{
    public interface ISyncVersionManager
    {
        Task<int> GetLastSyncVersion(string entityType, string syncZone);
        Task<int> IncrementSyncVersion(string entityType, string syncZone);
    }
}
