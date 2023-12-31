using fast_sync_core.abstraction.data;
using System;
using System.Linq.Expressions;

namespace fast_sync_core.implementation.data
{
    public class SyncableRepository<T> : ISyncableRepository<T> where T : ISyncableObject
    {
        private ISyncVersionManager SyncVersionManager { get; } = FastSync.GetInstance().GetSyncVersionManager();
        public ISyncableDataSource<T> DataSource { get; }
        private string Type { get; }

        public SyncableRepository(ISyncableDataSource<T> dataSource, string type)
        {
            DataSource = dataSource;
            Type = type;
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
            return await Query((item) => ids.Contains(item.Id) );
        }

        public async Task<List<T>> FetchMany(ISyncMetadata metadata)
        {
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            metadata.SyncZone = computedSyncZone;
            //return await DataSource.FetchMany(metadata);
            throw new Exception();
        }

        public async Task<List<T>> AddMany(List<T> entities, ISyncMetadata metadata)
        {
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            var lastKnownVersion = await SyncVersionManager.GetLastSyncVersion(Type, computedSyncZone);
            var incrementedEntities = IncrementObjectsVersion(entities, ++lastKnownVersion, computedSyncZone);
            incrementedEntities = await DataSource.AddMany(incrementedEntities);
            await SyncVersionManager.IncrementSyncVersion(Type, computedSyncZone);
            return incrementedEntities;
        }

        public async Task<List<T>> UpdateMany(List<T> entities, ISyncMetadata metadata)
        {
            List<T> mergedList = new List<T>();
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            mergedList.AddRange(await DoResolveConflictsObject(entities));
            var lastKnownVersion = await SyncVersionManager.GetLastSyncVersion(Type, computedSyncZone);
            mergedList = IncrementObjectsVersion(mergedList, ++lastKnownVersion, computedSyncZone);
            mergedList = await DataSource.UpdateMany(mergedList);
            await SyncVersionManager.IncrementSyncVersion(Type, computedSyncZone);
            return mergedList;
        }

        public async Task<List<T>> RemoveMany(List<T> entities, ISyncMetadata metadata)
        {
            var computedSyncZone = metadata.ComputeSyncZone(FastSync.GetInstance().GetSyncZoneConfiguration(metadata.Type));
            var lastKnownVersion = await SyncVersionManager.GetLastSyncVersion(Type, computedSyncZone);
            entities = IncrementObjectsVersion(entities, ++lastKnownVersion, computedSyncZone);
            entities = DoMarkObjectsAsDeleted(entities);
            entities = await UpdateMany(entities, metadata);
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
            var conflictsHandler = FastSync.GetInstance().GetObjectConflictsHandler(Type);
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
