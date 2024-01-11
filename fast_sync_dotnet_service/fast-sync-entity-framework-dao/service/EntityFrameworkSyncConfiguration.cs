using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.data;
namespace fast_sync_entity_framework_dao.service
{
    public class EntityFrameworkSyncConfiguration : SyncConfiguration
    {
        public string connectionString;
        public Func<FastSyncDataContext> classFactory;
        public EntityFrameworkSyncConfiguration(Func<FastSyncDataContext> classFactory) :base()
        {
            this.classFactory = classFactory;
            Init();
        }

        protected override void Init()
        {
            base.Init();
            SyncMetadataDataSource metadataDataSource =  new SyncMetadataDataSource(classFactory: classFactory);
            SyncVersionManager = new SyncVersionManager(metadataDataSource);
        }
    }
}
