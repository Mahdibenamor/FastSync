using fast_sync_core.abstraction.data;
using fast_sync_entity_framework_dao.data;
using Microsoft.EntityFrameworkCore;

namespace exemple.Item
{
    public class ItemDataSource : SyncableObjectDataSource<ISyncableObject<ISyncMetadata>>
    {
        public ItemDataSource(DbContext dataContext) : base(dataContext)
        {
        }
    }
}
