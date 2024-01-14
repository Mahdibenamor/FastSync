using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;

namespace exemple.Item
{
    public class ItemRepository : SyncableRepository<Item>
    {
        public ItemRepository(ISyncableDataSource<Item> dataSource) : base(dataSource)
        {
        }
    }
}
