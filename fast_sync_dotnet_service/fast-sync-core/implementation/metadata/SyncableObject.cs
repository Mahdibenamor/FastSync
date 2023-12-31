using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.metadata;

namespace fast_sync_core.implementation.data
{
    public class SyncableObject : ISyncableObject
    {
        public ISyncMetadata Metadata { get; set; } = new SyncMetadata();
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
