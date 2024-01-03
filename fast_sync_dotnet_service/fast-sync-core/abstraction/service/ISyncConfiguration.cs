namespace fast_sync_core.abstraction.data
{
    public interface ISyncConfiguration
    {
        void SetSyncableObject<T>(string entityType, ISyncableRepository<T> repository, SyncZoneRestrictionEnum? syncZoneRestriction, IConflictsHandler? conflictsHandler) where T : ISyncableObject<ISyncMetadata>;
        void SetObjectRepository<T>(string entityType, ISyncableRepository<T> repository) where T : ISyncableObject<ISyncMetadata>;
        void SetObjectConflictsHandler(string entityType, IConflictsHandler conflictsHandler);
        IConflictsHandler GetObjectConflictsHandler(string type);
        ISyncableRepository<T> GetObjectRepository<T>(string type) where T : ISyncableObject<ISyncMetadata>;
        ISyncManager GetSyncManager();
    }
}
