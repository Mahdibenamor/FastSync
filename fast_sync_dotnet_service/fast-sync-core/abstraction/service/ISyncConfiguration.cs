namespace fast_sync_core.abstraction.data
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public interface ISyncConfiguration
    {
        void SetSyncableObject<T>(string entityType, ISyncableRepository<T> repository, SyncZoneRestrictionEnum? syncZoneRestriction, IConflictsHandler? conflictsHandler) where T : IWithMetaData;
        void SetObjectRepository<T>(string entityType, ISyncableRepository<T> repository) where T : IWithMetaData;
        void SetObjectConflictsHandler(string entityType, IConflictsHandler conflictsHandler);
        IConflictsHandler GetObjectConflictsHandler(string type);
        ISyncableRepository<T> GetObjectRepository<T>(string type) where T : IWithMetaData;
        ISyncManager GetSyncManager();
    }
}
