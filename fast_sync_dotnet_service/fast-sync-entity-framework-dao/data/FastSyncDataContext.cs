
using fast_sync_entity_framework_dao.metadata;
using Microsoft.EntityFrameworkCore;
namespace fast_sync_entity_framework_dao.data
{
    public class FastSyncDataContext : DbContext
    {
        public DbSet<SyncMetadataModel> metadataModelDbSet { get; set; }

        public FastSyncDataContext(DbContextOptions options) : base(options)
        {

        }
    }
}
