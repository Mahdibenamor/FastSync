using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;

namespace fast_sync_core.abstraction.data
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;
    public interface ISyncableRepository<T> : IBaseRepository<T> where T :  IWithMetaData
    {
        Task<List<T>> UpdateMany(List<T> entities, ISyncMetadata metadata);
        Task<List<T>> AddMany(List<T> entities, ISyncMetadata metadata);
        Task<List<T>> RemoveMany(List<T> entities, ISyncMetadata metadata);
        Task<List<T>> FetchMany(ISyncMetadata metadata);
    }
}
