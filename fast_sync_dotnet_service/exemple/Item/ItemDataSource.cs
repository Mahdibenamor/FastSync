using fast_sync_entity_framework_dao.data;
using Microsoft.EntityFrameworkCore;

namespace exemple.Item
{
    public class ItemDataSource : SyncableObjectDataSource<Item>
    {
        public ItemDataSource(DbContext dataContext) : base(dataContext)
        {
        }
    }
}
