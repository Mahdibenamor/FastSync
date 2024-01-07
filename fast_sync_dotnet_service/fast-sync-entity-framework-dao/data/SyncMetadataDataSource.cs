using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.metadata;
using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.data
{
    public class SyncMetadataDataSource : SyncableObjectDataSource<SyncMetadata>, ISyncableDataSource<SyncMetadata>
    {
        public SyncMetadataDataSource(DbContext dataContext) : base(dataContext) { }
    }
}
