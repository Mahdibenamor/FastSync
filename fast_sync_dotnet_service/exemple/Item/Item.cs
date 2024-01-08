using fast_sync_core.implementation.data;

namespace exemple.Item
{
    public class Item: SyncableObject
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }  
}
