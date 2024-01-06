using fast_sync_core.abstraction;
using fast_sync_core.abstraction.data;
using System.Xml.Schema;

namespace fast_sync_core.implementation
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public class SyncConfiguration : ISyncConfiguration
    {
        private SyncVersionManager? _syncVersionManager;
        private Dictionary<string, object> Container = new Dictionary<string, object>();
        private Dictionary<string, Type> TypesContainer = new Dictionary<string, Type>();

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

        public void SetSyncableObject<T>(Type entityType, ISyncableRepository<T> repository, SyncZoneRestrictionEnum? syncZoneRestriction, IConflictsHandler? conflictsHandler = null) where T : IWithMetaData
        {
            SetObjectType(entityType);
            SetSyncZoneTypeConfiguration(entityType, syncZoneRestriction ?? SyncZoneRestrictionEnum.Global);
            SetObjectConflictsHandler(entityType, conflictsHandler);
            SetObjectRepository(entityType, repository);
        }
        
        public void SetObjectRepository<T>(Type entityType, ISyncableRepository<T> repository) where T : IWithMetaData
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

        public void SetObjectType(Type entityType)
        {
            TypesContainer[entityType.Name.ToString()] = entityType;
        }

        public Type getObjectType(string entityType)
        {
            if (TypesContainer.TryGetValue(entityType, out Type? type))
            {
                return type;
            }
            throw new InvalidOperationException($"{type} is not configured well, please check the configuration");
        }

        public IConflictsHandler GetObjectConflictsHandler(string type)
        {
            if (Container.TryGetValue(type + Constants.ConflictsHandlerName, out var conflictsHandler))
            {
                return (IConflictsHandler)conflictsHandler;
            }
            throw new InvalidOperationException($"ConflictsHandler of the {type} is not configured well, please check the configuration");
        }

        public void SetObjectConflictsHandler(Type entityType, IConflictsHandler? conflictsHandler)
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

        public void SetSyncZoneTypeConfiguration(Type entityType, SyncZoneRestrictionEnum syncZoneRestriction)
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

        public ISyncableRepository<T> GetObjectRepository<T>(string type) where T : IWithMetaData
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
