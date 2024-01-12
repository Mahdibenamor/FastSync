using fast_sync_core.implementation.data;

namespace fast_sync_core.abstraction.data
{

    public interface ISyncConfiguration
    {
        public void SetSyncableObject<T>(Type entityType, ISyncableRepository<T> repository, SyncZoneRestrictionEnum? syncZoneRestriction, IConflictsHandler conflictsHandler) where T : SyncableObject;
        void SetObjectRepository<T>(Type entityType, ISyncableRepository<T> repository) where T : SyncableObject;
        void SetObjectConflictsHandler(Type entityType, IConflictsHandler conflictsHandler);
        public void SetObjectType(Type entityType);
        public Type getObjectType(string entityType);
        IConflictsHandler GetObjectConflictsHandler(string type);
        object GetObjectRepository<T>(string type) where T : SyncableObject;
        ISyncManager GetSyncManager();
    }
}
