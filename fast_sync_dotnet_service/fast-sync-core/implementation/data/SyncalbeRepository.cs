using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.metadata;
using System.Linq.Expressions;

namespace fast_sync_core.implementation.data
{

    public class SyncableRepository<T> : ISyncableRepository<T> where T : SyncableObject
    {
        private ISyncVersionManager SyncVersionManager { get; } = FastSync.GetSyncVersionManager();
        public ISyncableDataSource<T> DataSource { get; }

        private JsonObjectSerializable<T> objectSerializable = new JsonObjectSerializable<T>();

        public SyncableRepository(ISyncableDataSource<T> dataSource)
        {
            DataSource = dataSource;
        }

        public async Task<T> Add(T entity)
        {
            return await DataSource.Add(entity);
        }

        public async Task<T> Update(string id, T entity)
        {
            return await DataSource.Update(id, entity);
        }

        public async Task<T?> FindById(string id)
        {
            return await DataSource.FindById(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await DataSource.GetAll();
        }

        public async Task<List<T>> Query(Expression<Func<T, bool>> filter)
        {
            return await DataSource.Query(filter);
        }

        public async Task<int> Count()
        {
            return await DataSource.Count();
        }

        private async Task<List<T>> GetObjectsByIds(List<string> ids)
        {
            return await Query((item) => ids.Contains(item.Id));
        }

        public async Task<List<T>> FetchMany(ISyncMetadata metadata)
        {
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            metadata.SyncZone = computedSyncZone;
            ISyncableDataSource<SyncMetadata> metadataDataSource = FastSync.GetSyncVersionManager().metadataDataSource;
            List<SyncMetadata> metadatas = await metadataDataSource.Query((m) => m.Id != typeof(T).Name && m.SyncZone == metadata.GetSyncZone() && m.Version > metadata.Version);
            List<string> metadataIds = metadatas.Select((e) => e.Id).ToList();
            List<T> objects = await DataSource.Query((e) => metadataIds.Contains(e.MetadataId));
            return objects;       
        }

        public async Task<List<T>> AddMany(List<object> jsonEntities, ISyncMetadata metadata)
        {
            List<T> entities = objectSerializable.GetTypedObjects(jsonEntities);
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            var lastKnownVersion = await SyncVersionManager.GetLastSyncVersion(typeof(T).Name, computedSyncZone);
            var incrementedEntities = IncrementObjectsVersion(entities, ++lastKnownVersion, computedSyncZone);
            incrementedEntities = await DataSource.AddMany(incrementedEntities);
            await SyncVersionManager.IncrementSyncVersion(typeof(T).Name, computedSyncZone);
            return incrementedEntities;
        }

        public async Task<List<T>> UpdateMany(List<object> jsonEntities, ISyncMetadata metadata)
        {
            List<T> entities = objectSerializable.GetTypedObjects(jsonEntities);
            return await _updateMany(entities: entities, metadata:metadata);
        }

        private async Task<List<T>> _updateMany(List<T> entities, ISyncMetadata metadata)
        {
            List<T> mergedList = new List<T>();
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            mergedList.AddRange(await DoResolveConflictsObject(entities));
            var lastKnownVersion = await SyncVersionManager.GetLastSyncVersion(typeof(T).Name, computedSyncZone);
            mergedList = IncrementObjectsVersion(mergedList, ++lastKnownVersion, computedSyncZone);
            mergedList = await DataSource.UpdateMany(mergedList);
            await SyncVersionManager.IncrementSyncVersion(typeof(T).Name, computedSyncZone);
            return mergedList;
        }



        public async Task<List<T>> RemoveMany(List<object> jsonEntities, ISyncMetadata metadata)
        {
            List<T> entities = objectSerializable.GetTypedObjects(jsonEntities);
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            var lastKnownVersion = await SyncVersionManager.GetLastSyncVersion(typeof(T).Name, computedSyncZone);
            entities = IncrementObjectsVersion(entities, ++lastKnownVersion, computedSyncZone);
            entities = DoMarkObjectsAsDeleted(entities);
            entities = await _updateMany(entities, metadata);
            return entities;
        }

        private async Task<List<T>> DoResolveConflictsObject(List<T> newObjects)
        {
            var oldObjects = await GetObjectsByIds(newObjects.Select(obj => obj.Id).ToList());
            return await ResolveConflicts(oldObjects, newObjects);
        }

        private List<T> DoMarkObjectsAsDeleted(List<T> entities)
        {
            List<T> markedList = new List<T>();
            foreach (T entity in entities)
            {
                entity.Deleted = true;
                markedList.Add(entity);
            }
            return markedList;
        }

        private List<T> IncrementObjectsVersion(List<T> entities, int version, string computedSyncZone)
        {
            foreach (var entity in entities)
            {
                entity.Metadata.Version = version;
                entity.Metadata.SyncZone = computedSyncZone;
            }
            return entities;
        }

        private async Task<List<T>> ResolveConflicts(List<T> oldList, List<T> newList)
        {
            var conflictsHandler = FastSync.GetInstance().GetObjectConflictsHandler(typeof(T).Name);
            if (conflictsHandler.GetConflictsResolutionStrategy() == ConflictsResolutionStrategyEnum.LastWriterWins)
            {
                return newList;
            }

            var newListDict = newList.ToDictionary(item => item.Id);
            var oldListDict = oldList.ToDictionary(item => item.Id);
            List<T> mergingResult = new List<T>();

            foreach (var id in newListDict.Keys)
            {
                if (oldListDict.ContainsKey(id))
                {
                    T result = await conflictsHandler.ResolveConflicts<T>(oldListDict[id], newListDict[id]);
                    mergingResult.Add(result);
                }
                else
                {
                    mergingResult.Add(newListDict[id]);
                }
            }
            return mergingResult;
        }

        public void Dispose()
        {
            DataSource.Dispose();
        }
    }
}
