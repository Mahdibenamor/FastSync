namespace fast_sync_core.abstraction.data
{
    public interface ISyncManager
    {
        void ProcessPush(SyncPayload payload);
        Task<SyncPayload> ProcessPull(SyncOperationMetadata metadata);
        SyncPayload ProcessSync(SyncOperationMetadata metadata);
    }
}
