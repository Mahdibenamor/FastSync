namespace fast_sync_core.abstraction.data
{
    public interface ISyncableRepository<T> : IBaseRepository<T>
    {
        Task<IEnumerable<T>> UpdateMany(IEnumerable<T> entities, ISyncMetadata metadata);
        Task<IEnumerable<T>> AddMany(IEnumerable<T> entities, ISyncMetadata metadata);
        Task<IEnumerable<T>> RemoveMany(IEnumerable<T> entities, ISyncMetadata metadata);
        Task<IEnumerable<T>> FetchMany(ISyncMetadata metadata);
    }
}
