using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;

namespace fast_sync_core.implementation
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;
    using WithMetaData = SyncableObject<SyncMetadata>;

    public class SyncManager : ISyncManager
    {
        public SyncManager() { }

        public async Task ProcessPush(SyncPayload payload)
        {
            payload = SyncPayload.Create(payload);
            ValidateMetadataSyncZones(payload.OperationMetadata);
            var objectTypes = payload.GetSyncedTypes();
            foreach (var type in objectTypes)
            {
                List<IWithMetaData> objects = payload.GetObjectsForType(type);
                var newObjects = objects.Where(obj => obj?.Metadata?.SyncOperation == SyncOperationEnum.Add).ToList();
                var updatedObjects = objects.Where(obj => obj?.Metadata?.SyncOperation == SyncOperationEnum.Update).ToList();
                var deletedObjects = objects.Where(obj => obj?.Metadata?.SyncOperation == SyncOperationEnum.Delete).ToList();
                var objectRepository = FastSync.GetInstance().GetObjectRepository<IWithMetaData>(type);
                if (newObjects.Any())
                    await objectRepository.AddMany(newObjects, payload.GetTypeMetadata(type));
                if (updatedObjects.Any())
                    await objectRepository.UpdateMany(updatedObjects, payload.GetTypeMetadata(type));
                if (deletedObjects.Any())
                    await objectRepository.RemoveMany(deletedObjects, payload.GetTypeMetadata(type));
            }
        }

        public async Task<SyncPayload> ProcessPull(SyncOperationMetadata metadata)
        {
            metadata = SyncOperationMetadata.Create(metadata);
            ValidateMetadataSyncZones(metadata);
            var syncPayload = new SyncPayload();
            var requestedTypes = metadata.GetSyncedTypes();
            var fastSync = FastSync.GetInstance();
            foreach (var type in requestedTypes)
            {
                var objectRepository = fastSync.GetObjectRepository<IWithMetaData>(type);
                var typeMetadata = metadata.GetTypeMetadata(type);
                List<IWithMetaData> objects = await objectRepository.FetchMany(metadata.GetTypeMetadata(type));
                syncPayload.PushObjects(type, objects, typeMetadata.ComputeSyncZone(fastSync.GetSyncZoneConfiguration(type)));
            }
            return syncPayload;
        }

        private void ValidateMetadataSyncZones(SyncOperationMetadata operationMetadata)
        {
            var objectTypes = operationMetadata.GetSyncedTypes();
            foreach (var type in objectTypes)
            {
                var typeMetadata = operationMetadata.GetTypeMetadata(type);
                if (String.IsNullOrEmpty(typeMetadata.GetSyncZone()) && FastSync.GetInstance().GetSyncZoneConfiguration(type) == SyncZoneRestrictionEnum.Restricted)
                {
                    throw new InvalidOperationException($"Type {type} is configured to be restricted, but no syncZoneAttribute was provided in the sync operation metadata");
                }
            }
        }
    }
}
