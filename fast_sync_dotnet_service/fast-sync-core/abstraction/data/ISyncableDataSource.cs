namespace fast_sync_core.abstraction.data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ISyncableDataSource<T>
    {
        Task<T> Add(T entity);
        Task<T> Update(string id, T entity);
        Task<T> FindById(string id);
        Task<List<T>> GetAll();
        Task<List<T>> Query(object query);
        Task<int> Count();
        Task<List<T>> UpdateMany(List<T> entities);
        Task<List<T>> AddMany(List<T> entities);
        Task<List<T>> FetchMany(ISyncMetadata syncMetadata);
        void Dispose();
    }
}


