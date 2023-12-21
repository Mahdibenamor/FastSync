namespace fast_sync_core.abstraction.data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ISyncableDataSource<T>
    {
        Task<T> Add(T entity);
        Task<T> Update(object query, T entity);
        Task<T> FindById(string id);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> Query(object query);
        Task<int> Count();
        Task<IEnumerable<T>> UpdateMany(IEnumerable<T> entities);
        Task<IEnumerable<T>> AddMany(IEnumerable<T> entities);
        Task<IEnumerable<T>> FetchMany(ISyncMetadata syncMetadata);
        void Dispose();
    }
}


