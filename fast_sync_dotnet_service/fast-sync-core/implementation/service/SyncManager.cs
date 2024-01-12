using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;
using Microsoft.Extensions.Logging.Abstractions;
using System.Reflection;


namespace fast_sync_core.implementation
{
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
                List<object> objects = payload.GetObjectsForType(type);
                object objectRepository = FastSync.GetObjectRepository<SyncableObject>(type);
                JsonSyncPayloadObjects jsonSyncPayloadObjects = new JsonSyncPayloadObjects().BuildJsonSyncPayload(objects);

                if (jsonSyncPayloadObjects.AddedNew.Any())
                {
                    var result = await _repositoryExecutor(repository: objectRepository, methodName: "AddMany", inputs:[ jsonSyncPayloadObjects.AddedNew, payload.GetTypeMetadata(type) ]);
                }
                if (jsonSyncPayloadObjects.Updated.Any())
                {
                    var result = await _repositoryExecutor(repository: objectRepository, methodName: "UpdateMany", inputs: [jsonSyncPayloadObjects.Updated, payload.GetTypeMetadata(type)]);
                }
                if (jsonSyncPayloadObjects.Deleted.Any())
                {
                    var result = await _repositoryExecutor(repository: objectRepository, methodName: "RemoveMany", inputs: [jsonSyncPayloadObjects.Deleted, payload.GetTypeMetadata(type)]);
                }
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
                object objectRepository =  FastSync.GetObjectRepository<SyncableObject>(type);
                var typeMetadata = metadata.GetTypeMetadata(type);
                object? result = await _repositoryExecutor(repository: objectRepository, methodName: "FetchMany", inputs: [metadata.GetTypeMetadata(type)]);
                List<SyncableObject> collection = result == null ? new List<SyncableObject>() : new List<SyncableObject>((IEnumerable<SyncableObject>)result);
                syncPayload.PushObjects(type, collection, typeMetadata.ComputeSyncZone(fastSync.GetSyncZoneConfiguration(type)));
            }
            return syncPayload;
        }

        private async Task<object?> _repositoryExecutor(object repository, string methodName, object[] inputs)
        {
            object? result = null;
            MethodInfo? addManyInfo = repository.GetType().GetMethod(methodName);
            if (addManyInfo != null)
            {
                Task? addManyTask = addManyInfo.Invoke(repository, inputs) as Task;
                if (addManyTask != null)
                {
                    await addManyTask;
                    var resultProperty = addManyTask.GetType().GetProperty("Result");
                    if (resultProperty != null)
                    {
                        result = resultProperty.GetValue(addManyTask);
                    }
                }
            }
            return result;
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
