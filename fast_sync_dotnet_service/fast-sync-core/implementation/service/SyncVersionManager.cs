using fast_sync_core.abstraction;
using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;

namespace fast_sync_core.implementation
{
    public class SyncVersionManager : ISyncVersionManager
    {
        private SyncableMetadataRepository<SyncMetadata> _syncMetadataRepository;
        private ISyncableDataSource<SyncMetadata> _syncMetadataDataSource;

        public SyncVersionManager(ISyncableDataSource<SyncMetadata> syncMetadataDataSource)
        {
            _syncMetadataDataSource = syncMetadataDataSource;
            _syncMetadataRepository = new SyncableMetadataRepository<SyncMetadata>(_syncMetadataDataSource);
        }

        public async Task<int> GetLastSyncVersion(string entityType, string syncZone)
        {
            var syncMetadataList = await _syncMetadataRepository.Query((metadata)=> metadata.Type == entityType && metadata.SyncZone == syncZone);
            if (syncMetadataList != null && syncMetadataList.Count != 0)
            {
                return syncMetadataList[0].Version;
            }
            else
            {
                var syncMetadata = await InitObjectMetadata(entityType, syncZone);
                return syncMetadata.Version;
            }
        }

        public async Task<int> IncrementSyncVersion(string entityType, string syncZone)
        {
            var syncMetadataList = await _syncMetadataRepository.Query((metadata) => metadata.Type == entityType && metadata.SyncZone == syncZone);
            SyncMetadata syncMetadata;
            if (syncMetadataList != null && syncMetadataList.Count != 0)
            {
                syncMetadata = syncMetadataList[0];
            }
            else
            {
                syncMetadata = await InitObjectMetadata(entityType, syncZone);
            }
            syncMetadata.Version++;
            syncMetadata = await _syncMetadataRepository.Update(syncMetadata.Id, syncMetadata);
            return syncMetadata.Version;
        }

        private async Task<SyncMetadata> InitObjectMetadata(string entityType, string syncZone)
        {
            var syncMetadataList = await _syncMetadataRepository.Query((metadata) => metadata.Type == entityType && metadata.SyncZone == syncZone);
            if (syncMetadataList == null || syncMetadataList.Count == 0)
            {
                var syncMetadata = new SyncMetadata();
                syncMetadata.SyncZone = syncZone;
                syncMetadata.Version = 0;
                syncMetadata.Type = entityType;
                syncMetadata.Timestamp = DateTime.Now.Ticks;
                return await _syncMetadataRepository.Add(syncMetadata);
            }
            return syncMetadataList.First();
        }
    }

}
