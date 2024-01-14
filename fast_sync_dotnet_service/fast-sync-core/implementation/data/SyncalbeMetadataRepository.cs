using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.metadata;
using System.Linq.Expressions;

namespace fast_sync_core.implementation.data
{
    public class SyncableMetadataRepository: IBaseRepository<SyncMetadata> 
    {
        public ISyncableDataSource<SyncMetadata> DataSource { get; private set; }

        public SyncableMetadataRepository(ISyncableDataSource<SyncMetadata> dataSource)
        {
            DataSource = dataSource;
        }

        public async Task<SyncMetadata> Add(SyncMetadata entity)
        {
            return await DataSource.Add(entity);
        }

        public async Task<SyncMetadata> Update(string id, SyncMetadata entity)
        {
            return await DataSource.Update(id, entity);
        }

        public async Task<SyncMetadata?> FindById(string id)
        {
            return await DataSource.FindById(id);
        }

        public async Task<List<SyncMetadata>> GetAll()
        {
            return await DataSource.GetAll();
        }

        public async Task<List<SyncMetadata>> Query(Expression<Func<SyncMetadata, bool>> filter)
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
