using fast_sync_core.implementation.metadata;

namespace fast_sync_entity_framework_dao.data
{
    public class SyncMetadataDataSource : SyncableObjectDataSource<SyncMetadata>
    {
        public SyncMetadataDataSource(Func<FastSyncDataContext> classFactory) : base(classFactory) { }
    }
}
