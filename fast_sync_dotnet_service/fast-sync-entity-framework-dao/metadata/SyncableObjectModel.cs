using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;


namespace fast_sync_entity_framework_dao.metadata
{
    public class SyncableObjectModel : SyncableObject<SyncMetadata>, ISyncableObject<ISyncMetadata>
    {
        ISyncMetadata ISyncableObject<ISyncMetadata>.Metadata { get => Metadata; set => Metadata = (SyncMetadata)value; }
    }
}
