using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.data;
namespace fast_sync_entity_framework_dao.service
{
    public class EntityFrameworkSyncConfiguration : SyncConfiguration
    {
        public Func<FastSyncDataContext> dbContextFactory;
        public EntityFrameworkSyncConfiguration(Func<FastSyncDataContext> dbContextFactory) :base()
        {
            this.dbContextFactory = dbContextFactory;
            Init();
        }

        protected override void Init()
        {
            base.Init();
            SyncMetadataDataSource metadataDataSource =  new SyncMetadataDataSource();
            SyncVersionManager = new SyncVersionManager(metadataDataSource);
        }
    }
}
