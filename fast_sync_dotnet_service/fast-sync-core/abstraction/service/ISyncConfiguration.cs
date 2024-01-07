namespace fast_sync_core.abstraction.data
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public interface ISyncConfiguration
    {
        void SetSyncableObject<T>(Type entityType, ISyncableRepository<T> repository, SyncZoneRestrictionEnum? syncZoneRestriction, IConflictsHandler? conflictsHandler) where T : IWithMetaData;
        void SetObjectRepository<T>(Type entityType, ISyncableRepository<T> repository) where T : IWithMetaData;
        void SetObjectConflictsHandler(Type entityType, IConflictsHandler conflictsHandler);
        public void SetObjectType(Type entityType);
        public Type getObjectType(string entityType);
        IConflictsHandler GetObjectConflictsHandler(string type);
        object GetObjectRepository<T>(string type) where T : IWithMetaData;
        ISyncManager GetSyncManager();
    }
}
