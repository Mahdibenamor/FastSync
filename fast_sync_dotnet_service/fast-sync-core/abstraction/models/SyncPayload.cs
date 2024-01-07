using fast_sync_core.implementation;
using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace fast_sync_core.abstraction.data
{
    using WithMetaData = SyncableObject<SyncMetadata>;
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public class SyncPayload
    {
        public Dictionary<string, List<object>> Data { get; set; }

        public SyncOperationMetadata OperationMetadata { get; set; }

        public SyncPayload()
        {
            Data = new Dictionary<string, List<object>>();
            OperationMetadata = new SyncOperationMetadata();
        }

        public static SyncPayload Create(SyncPayload syncPayload)
        {
            var payload = new SyncPayload
            {
                Data = new Dictionary<string, List<object>>(syncPayload.Data),
                OperationMetadata = SyncOperationMetadata.Create(syncPayload.OperationMetadata)
            };
            return payload;
        }

        public  void PushObjects<T>(string type, List<T> entities, string syncZone) where T : IWithMetaData
        {
            if (entities.Count > 0)
            {
                if (!Data.ContainsKey(type))
                {
                    Data[type] = new List<object>();
                }
                Data[type].AddRange(entities.Cast<WithMetaData>());
                var globalSyncVersion =  BuildTypeMetadata<T>(type, syncZone);
                OperationMetadata.SetMetadata(type, globalSyncVersion);
            }
        }

        public List<IWithMetaData> GetObjectsForType(string type)
        {
            List<IWithMetaData> data = new List<IWithMetaData>();
            foreach (var obj in Data[type])
            {
                JsonElement jsonElement = (JsonElement)obj;
                JsonSerializerOptions options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                object? instanceCreated = null;
                if (jsonElement.ValueKind != JsonValueKind.Undefined)
                {
                    Type elementType = FastSync.getObjectType(type);
                    instanceCreated = JsonSerializer.Deserialize(jsonElement.GetRawText(), elementType, options);
                }
                if (instanceCreated != null)
                {
                    data.Add((IWithMetaData)instanceCreated);
                }
            }
            return data;

        }   

        public List<string> GetSyncedTypes()
        {
            return Data.Keys.ToList();
        }

        public ISyncMetadata GetTypeMetadata(string type)
        {
            var metadata = OperationMetadata.GetTypeMetadata(type);
            if (metadata != null)
            {
                return metadata;
            }
            throw new InvalidOperationException("Metadata of each synced type should be specified, please check how you build SyncPayload");
        }

        private SyncMetadata BuildTypeMetadata<T>(string type, string syncZone) where T : IWithMetaData
        {
            List<IWithMetaData> objects = GetObjectsForType(type);
            List<WithMetaData> castedObjects = new List<WithMetaData>();
            foreach (var obj in objects)
            {
                castedObjects.Add((WithMetaData)obj);
            }
            var newVersion = castedObjects.Max(obj => obj.Metadata.Version);
            SyncMetadata syncMetadata = new SyncMetadata();
            syncMetadata.Id = type;
            syncMetadata.SyncZone = syncZone;
            syncMetadata.Version = newVersion;
            syncMetadata.Type = type;
            return syncMetadata;
        }
    }
}
