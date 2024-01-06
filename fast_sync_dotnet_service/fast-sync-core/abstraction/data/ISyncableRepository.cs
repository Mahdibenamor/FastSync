namespace fast_sync_core.abstraction.data
{
    public interface ISyncableRepository<T> : IBaseRepository<T>
    {
        Task<List<T>> UpdateMany(List<T> entities, ISyncMetadata metadata);
        Task<List<T>> AddMany(List<T> entities, ISyncMetadata metadata);
        Task<List<T>> RemoveMany(List<T> entities, ISyncMetadata metadata);
        Task<List<T>> FetchMany(ISyncMetadata metadata);
    }
}
