using fast_sync_core.abstraction.data;
namespace fast_sync_core.implementation.data
{
    public class SyncableObject<T>: ISyncableObject<T>
        where T: ISyncMetadata
    {
        public T Metadata { get; set; } 
        public string MetadataId { get; set; } = string.Empty;
        public bool Deleted { get; set; } = false;
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public int GetVersion()
        {
            return Metadata.Version;
        }

        public int SetVersion(int version)
        {
            return Metadata.Version = version;
        }
    }
}
