using fast_sync_core.abstraction.data;

namespace fast_sync_core.implementation
{
    public class FastSync
    {
        private static FastSync _instance = new FastSync();
        private SyncConfiguration? _syncConfiguration;

        private FastSync() { }

        public static FastSync GetInstance(SyncConfiguration? syncConfiguration = null)
        {
            if (_instance == null)
            {
                _instance = new FastSync();
            }

            if (syncConfiguration != null)
            {
                SetSyncConfiguration(syncConfiguration);
            }

            return _instance;
        }

        public SyncVersionManager GetSyncVersionManager()
        {
            return GetSyncConfiguration().SyncVersionManager;
        }

        private static void SetSyncConfiguration(SyncConfiguration syncConfiguration)
        {
            _instance._syncConfiguration = syncConfiguration;
        }

        public void SetSyncableObject<T>(string entityType, ISyncableRepository<T> repository, IConflictsHandler? conflictsHandler = null, SyncZoneRestrictionEnum syncZoneRestriction = SyncZoneRestrictionEnum.Global) where T : ISyncableObject
        {
            var syncConfiguration = GetSyncConfiguration();
            syncConfiguration.SetSyncableObject(entityType, repository, syncZoneRestriction, conflictsHandler);
            SetSyncConfiguration(syncConfiguration);
        }

        public IConflictsHandler GetObjectConflictsHandler(string type)
        {
            return GetSyncConfiguration().GetObjectConflictsHandler(type);
        }

        public ISyncableRepository<T> GetObjectRepository<T>(string type) where T : ISyncableObject
        {
            return GetSyncConfiguration().GetObjectRepository<T>(type);
        }

        public SyncZoneRestrictionEnum GetSyncZoneConfiguration(string type)
        {
            return GetSyncConfiguration().GetSyncZoneConfiguration(type);
        }

        public ISyncManager GetSyncManager()
        {
            return GetSyncConfiguration().GetSyncManager();
        }

        public SyncConfiguration GetSyncConfiguration()
        {
            if(_instance._syncConfiguration != null)
            {
                return _instance._syncConfiguration;
            }
            else
            {
                throw new InvalidOperationException("Please init the SyncConfiguration, FastSync.GetInstance(configuration)");
            }
        }
    }
}
