using fast_sync_entity_framework_dao.data;

namespace exemple.Item
{
    public class ItemDataSource : SyncableObjectDataSource<Item>
    {
        public ItemDataSource(Func<FastSyncDataContext> classFactory) : base(classFactory)
        {
        }
    }
}
