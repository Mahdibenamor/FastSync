using fast_sync_core.implementation.metadata;

namespace fast_sync_core.abstraction.data
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;
    public class SyncPayload
    {
        public Dictionary<string, List<IWithMetaData>> Data { get; set; }
        public SyncOperationMetadata OperationMetadata { get; set; }

        public SyncPayload()
        {
            Data = new Dictionary<string, List<IWithMetaData>>();
            OperationMetadata = new SyncOperationMetadata();
        }

        public static SyncPayload Create(SyncPayload syncPayload)
        {
            var payload = new SyncPayload
            {
                Data = new Dictionary<string, List<IWithMetaData>>(syncPayload.Data),
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
                    Data[type] = new List<IWithMetaData>();
                }
                Data[type].AddRange(entities.Cast<IWithMetaData>());
                var globalSyncVersion =  BuildTypeMetadata(type, syncZone);
                OperationMetadata.SetMetadata(type, globalSyncVersion);
            }
        }

        public List<IWithMetaData> GetObjectsForType(string type)
        {
            return Data.ContainsKey(type) ? Data[type] : new List<IWithMetaData>();
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

        private  SyncMetadata BuildTypeMetadata(string type, string syncZone)
        {
            var objects = GetObjectsForType(type).Cast<IWithMetaData>();
            var newVersion = objects.Max(obj => obj.Metadata.Version);
            SyncMetadata syncMetadata = new SyncMetadata();
            syncMetadata.Id = type;
            syncMetadata.SyncZone = syncZone;
            syncMetadata.Version = newVersion;
            syncMetadata.Type = type;
            return syncMetadata;
        }
    }
}
