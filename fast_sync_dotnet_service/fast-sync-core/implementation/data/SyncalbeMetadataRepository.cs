using fast_sync_core.abstraction.data;
using System.Linq.Expressions;

namespace fast_sync_core.implementation.data
{
    public class SyncableMetadataRepository: IBaseRepository<ISyncMetadata> 
    {
        public ISyncableDataSource<ISyncMetadata> DataSource { get; private set; }

        public SyncableMetadataRepository(ISyncableDataSource<ISyncMetadata> dataSource)
        {
            DataSource = dataSource;
        }

        public async Task<ISyncMetadata> Add(ISyncMetadata entity)
        {
            return await DataSource.Add(entity);
        }

        public async Task<ISyncMetadata> Update(string id, ISyncMetadata entity)
        {
            return await DataSource.Update(id, entity);
        }

        public async Task<ISyncMetadata?> FindById(string id)
        {
            return await DataSource.FindById(id);
        }

        public async Task<List<ISyncMetadata>> GetAll()
        {
            return await DataSource.GetAll();
        }

        public async Task<List<ISyncMetadata>> Query(Expression<Func<ISyncMetadata, bool>> filter)
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
