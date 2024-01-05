using exemple.Item;
using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.data
{
    public class DataContext : FastSyncDataContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Item> Items { get; set; }
    }
}
