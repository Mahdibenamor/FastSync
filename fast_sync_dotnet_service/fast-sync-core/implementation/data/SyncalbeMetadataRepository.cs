using fast_sync_core.abstraction.data;
using System.Linq.Expressions;

namespace fast_sync_core.implementation.data
{
    public class SyncableMetadataRepository<T> : IBaseRepository<T> where T : IWithId
    {
        public ISyncableDataSource<T> DataSource { get; private set; }

        public SyncableMetadataRepository(ISyncableDataSource<T> dataSource)
        {
            DataSource = dataSource;
        }

        public async Task<T> Add(T entity)
        {
            return await DataSource.Add(entity);
        }

        public async Task<T> Update(string id, T entity)
        {
            return await DataSource.Update(id, entity);
        }

        public async Task<T?> FindById(string id)
        {
            return await DataSource.FindById(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await DataSource.GetAll();
        }

        public async Task<List<T>> Query(Expression<Func<T, bool>> filter)
        {
            return await DataSource.Query(filter);
        }

        public async Task<int> Count()
        {
            return await DataSource.Count();
        }

        public void Dispose()
        {
            DataSource.Dispose();
        }
    }
}
