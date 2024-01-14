namespace fast_sync_core.abstraction.data
{
    public interface ISyncManager
    {
        Task ProcessPush(SyncPayload payload);
        Task<SyncPayload> ProcessPull(SyncOperationMetadata metadata);
    }
}
