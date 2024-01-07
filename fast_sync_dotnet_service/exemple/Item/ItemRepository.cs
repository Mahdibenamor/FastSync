using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;

namespace exemple.Item
{
    public class ItemRepository : SyncableRepository<ISyncableObject<ISyncMetadata>>, ISyncableRepository<ISyncableObject<ISyncMetadata>>
    {
        public ItemRepository(ISyncableDataSource<ISyncableObject<ISyncMetadata>> dataSource) : base(dataSource)
        {
        }
    }
}
