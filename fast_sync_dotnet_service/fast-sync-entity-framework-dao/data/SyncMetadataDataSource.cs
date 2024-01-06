using fast_sync_core.abstraction.data;
using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.data
{
    public class SyncMetadataDataSource : SyncableObjectDataSource<ISyncMetadata>, ISyncableDataSource<ISyncMetadata>
    {
        public SyncMetadataDataSource(DbContext dataContext) : base(dataContext) { }
    }
}
