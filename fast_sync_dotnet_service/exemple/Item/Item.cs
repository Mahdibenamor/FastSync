using fast_sync_core.abstraction.data;
using fast_sync_entity_framework_dao.metadata;

namespace exemple.Item
{
    public class Item: SyncableObjectModel, ISyncableObject<ISyncMetadata>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    
}
