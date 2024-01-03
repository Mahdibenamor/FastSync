using fast_sync_core.abstraction;
using fast_sync_core.abstraction.data;

namespace fast_sync_core.implementation
{
    public class SyncConfiguration : ISyncConfiguration
    {
        private SyncVersionManager? _syncVersionManager;
        private Dictionary<string, object> Container = new Dictionary<string, object>();

        public SyncVersionManager SyncVersionManager
        {
            get
            {
                if (_syncVersionManager != null)
                {
                    return _syncVersionManager;
                }
                throw new InvalidOperationException("Please init the SyncVersionManager, FastSync.GetInstance(configuration)");
            }
            set => _syncVersionManager = value;
        }

        public SyncConfiguration()
        {
        }

        protected virtual void Init()
        {
            SetSyncManager(new SyncManager());
        }

        public void SetSyncableObject<T>(string entityType, ISyncableRepository<T> repository, SyncZoneRestrictionEnum? syncZoneRestriction, IConflictsHandler? conflictsHandler = null) where T : ISyncableObject<ISyncMetadata>
        {
            SetSyncZoneTypeConfiguration(entityType, syncZoneRestriction ?? SyncZoneRestrictionEnum.Global);
            SetObjectConflictsHandler(entityType, conflictsHandler);
            SetObjectRepository(entityType, repository);
        }
        
        public void SetObjectRepository<T>(string entityType, ISyncableRepository<T> repository) where T : ISyncableObject<ISyncMetadata>
        {
            if (repository != null)
            {
                Container[entityType + Constants.RepositoryName] = repository;
            }
            else
            {
                throw new InvalidOperationException($"Repository of the {entityType} is not configured well, please check the configuration");
            }
        }

        public IConflictsHandler GetObjectConflictsHandler(string type)
        {
            if (Container.TryGetValue(type + Constants.ConflictsHandlerName, out var conflictsHandler))
            {
                return (IConflictsHandler)conflictsHandler;
            }
            throw new InvalidOperationException($"ConflictsHandler of the {type} is not configured well, please check the configuration");
        }

        public void SetObjectConflictsHandler(string entityType, IConflictsHandler? conflictsHandler)
        {
            if (conflictsHandler != null)
            {
                Container[entityType + Constants.ConflictsHandlerName] = conflictsHandler;
            }
            else
            {
                throw new InvalidOperationException($"ConflictsHandler of the {entityType} is not configured well, please check the configuration");
            }
        }

        public void SetSyncZoneTypeConfiguration(string entityType, SyncZoneRestrictionEnum syncZoneRestriction)
        {
            Container[entityType + Constants.SyncZoneRestriction] = syncZoneRestriction;
        }

        public SyncZoneRestrictionEnum GetSyncZoneConfiguration(string type)
        {
            if (Container.TryGetValue(type + Constants.SyncZoneRestriction, out var syncZoneRestriction))
            {
                return (SyncZoneRestrictionEnum)syncZoneRestriction;
            }
            throw new InvalidOperationException($"SyncZoneRestriction of the {type} should not be undefined");
        }

        public ISyncableRepository<T> GetObjectRepository<T>(string type) where T : ISyncableObject<ISyncMetadata>
        {
            if (Container.TryGetValue(type + Constants.RepositoryName, out var repository))
            {
                return (ISyncableRepository<T>)repository;
            }
            throw new InvalidOperationException($"Repository of the {type} is not configured well, please check the configuration");
        }

        public ISyncManager GetSyncManager()
        {
            if (Container.TryGetValue(nameof(SyncManager), out var syncManager))
            {
                return (ISyncManager)syncManager;
            }
            throw new InvalidOperationException("Sync manager should not be null, check your sync configuration class");
        }

        public void SetSyncManager(ISyncManager syncManager)
        {
            if (syncManager != null)
            {
                Container[nameof(SyncManager)] = syncManager;
            }
            else
            {
                throw new InvalidOperationException("Sync manager should not be null, check your sync configuration class");
            }
        }
    }
}
