using fast_sync_core.abstraction;
using fast_sync_core.abstraction.data;

namespace fast_sync_core.implementation.metadata
{
    public class SyncMetadata : ISyncMetadata
    {
        public string Id { get; set; }

        public long Timestamp { get; set; }
        public SyncOperationEnum SyncOperation { get; set; }
        public string Type { get; set; }
        public int Version { get; set; }
        public string SyncZone { get; set; }

        public SyncMetadata(string type, int version, string syncZone)
        {
            Id = Guid.NewGuid().ToString();
            Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            Type = type;
            Version = version;
            SyncZone = syncZone;
        }

        public static SyncMetadata Create(SyncMetadata metadata)
        {
            return new SyncMetadata(metadata.Type, metadata.Version, metadata.SyncZone);
        }

        public string GetSyncZone()
        {
            return SyncZone;
        }

        public string ComputeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType)
        {
            if (syncZoneRestrictionType == SyncZoneRestrictionEnum.Restricted)
            {
                return GetSyncZone();
            }
            else
            {
                return Constants.GlobalSyncZoneRestriction;
            }
        }
    }
}
