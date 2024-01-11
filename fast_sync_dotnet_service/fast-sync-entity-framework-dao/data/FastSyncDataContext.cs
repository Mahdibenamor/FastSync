
using fast_sync_core.implementation.metadata;
using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.data
{
    public class FastSyncDataContext : DbContext
    {
        public DbSet<SyncMetadata> SyncMetadatas { get; set; }

        public FastSyncDataContext(string connectionString) : base(new DbContextOptionsBuilder<FastSyncDataContext>()
                .UseSqlServer(connectionString).Options)
        {
        }
    }
}
