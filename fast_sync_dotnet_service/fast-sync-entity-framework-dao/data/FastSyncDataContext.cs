
using fast_sync_core.implementation.metadata;
using Microsoft.EntityFrameworkCore;
namespace fast_sync_entity_framework_dao.data
{
    public class FastSyncDataContext : DbContext
    {
        public DbSet<SyncMetadata> SyncMetadatas { get; set; }

        public FastSyncDataContext(DbContextOptions options) : base(options)
        {

        }
    }
}
