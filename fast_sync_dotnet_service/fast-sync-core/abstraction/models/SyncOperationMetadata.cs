using fast_sync_core.implementation;

namespace fast_sync_core.abstraction.data
{
    public class SyncOperationMetadata
    {
        public Dictionary<string, ISyncMetadata> Metadata { get; private set; }

        public SyncOperationMetadata()
        {
            Metadata = new Dictionary<string, ISyncMetadata>();
        }

        public static SyncOperationMetadata Create(SyncOperationMetadata operationMetadata)
        {
            var syncOperationMetadata = new SyncOperationMetadata();
            foreach (var keyValuePair in operationMetadata.Metadata)
            {
                var value = keyValuePair.Value;
                var syncMetadata = new SyncMetadata(value.Type, value.Version, value.SyncZone)
                {
                    Id = value.Id,
                    SyncOperation = value.SyncOperation,
                    Timestamp = value.Timestamp
                };
                syncOperationMetadata.SetMetadata(keyValuePair.Key, syncMetadata);
            }

            return syncOperationMetadata;
        }

        public void SetMetadata(string type, ISyncMetadata metadata)
        {
            Metadata[type] = metadata;
        }

        public ISyncMetadata GetTypeMetadata(string type)
        {
            if (Metadata.ContainsKey(type) && Metadata[type] != null)
            {
                return Metadata[type];
            }
            throw new InvalidOperationException("Metadata of each synced type should be specified, please check how you build SyncOperationMetadata");
        }

        public IEnumerable<string> GetSyncedTypes()
        {
            return Metadata.Keys;
        }
    }
}
