using fast_sync_entity_framework_dao.metadata;
using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.data
{
    public class SyncMetadataDataSource : SyncableObjectDataSource<SyncMetadataModel>
    {
        public SyncMetadataDataSource(DbContext dataContext) : base(dataContext) { }
    }
}
