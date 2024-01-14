using fast_sync_core.implementation.data;

namespace fast_sync_core.abstraction.data
{
    public interface ISyncableRepository<T> : IBaseRepository<T>
         where T : SyncableObject
    {
        Task<List<T>> UpdateMany(List<object> jsonEntities, ISyncMetadata metadata);
        Task<List<T>> AddMany(List<object> jsonEntities, ISyncMetadata metadata);
        Task<List<T>> RemoveMany(List<object> jsonEntities, ISyncMetadata metadata);
        Task<List<T>> FetchMany(ISyncMetadata jsonEntities);
    }
}
