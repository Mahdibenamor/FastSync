using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.data;
using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.service
{
    public class EntityFrameworkSyncConfiguration : SyncConfiguration
    {
        DbContext dataContext;
        public EntityFrameworkSyncConfiguration(DbContext dataContext):base()
        {
            this.dataContext = dataContext;
            Init();
        }

        protected override void Init()
        {
            base.Init();
            SyncMetadataDataSource metadataDataSource =  new SyncMetadataDataSource(dataContext);
            SyncVersionManager = new SyncVersionManager(metadataDataSource);
        }
    }
}
