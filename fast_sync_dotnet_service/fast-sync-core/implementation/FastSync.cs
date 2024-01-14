using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;

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

        public static SyncVersionManager GetSyncVersionManager()
        {
            return GetSyncConfiguration().SyncVersionManager;
        }

        private static void SetSyncConfiguration(SyncConfiguration syncConfiguration)
        {
            _instance._syncConfiguration = syncConfiguration;
        }

        public static void SetSyncableObject<T>(Type type, ISyncableRepository<T> repository, IConflictsHandler conflictsHandler, SyncZoneRestrictionEnum syncZoneRestriction = SyncZoneRestrictionEnum.Global) where T : SyncableObject
        {
            var syncConfiguration = GetSyncConfiguration();
            syncConfiguration.SetSyncableObject(type, repository, syncZoneRestriction, conflictsHandler);
            SetSyncConfiguration(syncConfiguration);
        }

        public static Type getObjectType(string entityType)
        {
            return GetSyncConfiguration().getObjectType(entityType);
        }

        public IConflictsHandler GetObjectConflictsHandler(string type)
        {
            return GetSyncConfiguration().GetObjectConflictsHandler(type);
        }

        public static object GetObjectRepository<T>(string type) where T : SyncableObject
        {
            return GetSyncConfiguration().GetObjectRepository<T>(type);
        }

        public SyncZoneRestrictionEnum GetSyncZoneConfiguration(string type)
        {
            return GetSyncConfiguration().GetSyncZoneConfiguration(type);
        }

        public static ISyncManager GetSyncManager()
        {
            return GetSyncConfiguration().GetSyncManager();
        }

        public static SyncConfiguration GetSyncConfiguration()
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
