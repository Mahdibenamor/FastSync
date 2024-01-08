using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;
using System.Text.Json;

namespace fast_sync_core.abstraction.data
{
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

        //public  void PushObjects<T>(string type, List<T> entities, string syncZone) where T : SyncableObject
        //{
        //    if (entities.Count > 0)
        //    {
        //        if (!Data.ContainsKey(type))
        //        {
        //            Data[type] = new List<object>();
        //        }
        //        Data[type].AddRange(entities.Cast<SyncableObject>());
        //        var globalSyncVersion =  BuildTypeMetadata<T>(type: type,syncZone: syncZone,version: GetObjectsForType(type).Max(obj => obj.Metadata.Version));
        //        OperationMetadata.SetMetadata(type, globalSyncVersion);
        //    }
        //}

        public List<object> GetObjectsForType(string type)
        {
            return Data.ContainsKey(type) ? Data[type] : [];
        }

        //public List<SyncableObject> GetObjectsForType(string type)
        //{
        //    List<SyncableObject> data = new List<SyncableObject>();
        //    foreach (var obj in Data[type])
        //    {
        //        JsonElement jsonElement = (JsonElement)obj;
        //        JsonSerializerOptions options = new JsonSerializerOptions
        //        {
        //            PropertyNameCaseInsensitive = true
        //        };
        //        object? instanceCreated = null;
        //        if (jsonElement.ValueKind != JsonValueKind.Undefined)
        //        {
        //            Type elementType = FastSync.getObjectType(type);
        //            instanceCreated = JsonSerializer.Deserialize(jsonElement.GetRawText(), elementType, options);
        //        }
        //        if (instanceCreated != null)
        //        {
        //            data.Add((SyncableObject)instanceCreated);
        //        }
        //    }
        //    return data;
        //}   

        public List<string> GetSyncedTypes()
        {
            return Data.Keys.ToList();
        }

        public SyncMetadata GetTypeMetadata(string type)
        {
            var metadata = OperationMetadata.GetTypeMetadata(type);
            if (metadata != null)
            {
                return metadata;
            }
            throw new InvalidOperationException("Metadata of each synced type should be specified, please check how you build SyncPayload");
        }

        private SyncMetadata BuildTypeMetadata<T>(string type, string syncZone, int version) where T : SyncableObject
        {
            SyncMetadata syncMetadata = new SyncMetadata();
            syncMetadata.Id = type;
            syncMetadata.SyncZone = syncZone;
            syncMetadata.Version = version;
            syncMetadata.Type = type;
            return syncMetadata;
        }
    }

    public class JsonSyncPayloadObjects
    {
        public List<object> AddedNew { get; set; }
        public List<object> Updated { get; set; }
        public List<object> Deleted { get; set; }

        public JsonSyncPayloadObjects()
        {
            AddedNew = new List<object>();
            Updated = new List<object>();
            Deleted = new List<object>();
        }

        private void pushAddedNewObject(object obj)
        {
           AddedNew.Add(obj);
        }
        private void pushUpdatedObject(object obj)
        {
            Updated.Add(obj);
        }
        private void pushDeletedObject(object obj)
        {
            Deleted.Add(obj);
        }

        public JsonSyncPayloadObjects BuildJsonSyncPayload(List<object> data)
        {

            foreach (var obj in data)
            {
                JsonElement jsonElement = (JsonElement)obj;
                if (jsonElement.TryGetProperty("metadata", out JsonElement metaDataJsonElement))
                {
                    if (metaDataJsonElement.TryGetProperty("syncOperation", out JsonElement syncOperationJsonElement))
                    {
                        if (syncOperationJsonElement.ValueKind == JsonValueKind.Number)
                        {
                            if (int.TryParse(syncOperationJsonElement.ToString(), out int syncOperation))
                            {
                                if (syncOperation == 0)
                                {
                                    pushAddedNewObject(obj);
                                }
                                if (syncOperation == 1)
                                {
                                    pushUpdatedObject(obj);
                                }
                                if (syncOperation == 2)
                                {
                                    pushDeletedObject(obj);
                                }
                            }
                        }
                    }
                }
            }           
            return this;
        }
    }
}
