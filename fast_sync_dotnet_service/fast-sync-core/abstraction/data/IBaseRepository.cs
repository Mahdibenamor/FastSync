namespace fast_sync_core.abstraction.data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBaseRepository<T>
    {
        Task<T> Add(T entity);
        Task<T> Update(string id, T entity);
        Task<T> FindById(string id);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> Query(object filter);
        Task<int> Count();
        void Dispose();
    }
}
