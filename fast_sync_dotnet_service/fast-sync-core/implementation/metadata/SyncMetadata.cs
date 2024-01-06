using fast_sync_core.abstraction;
using fast_sync_core.abstraction.data;

namespace fast_sync_core.implementation.metadata
{
    public class SyncMetadata : ISyncMetadata
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public long Timestamp { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        public SyncOperationEnum SyncOperation { get; set; }
        public string Type { get; set; } = string.Empty;
        public int Version { get; set; } = 0;
        public string SyncZone { get; set; } = string.Empty;

        public SyncMetadata()
        {
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
