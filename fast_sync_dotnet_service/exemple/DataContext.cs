using Microsoft.EntityFrameworkCore;

namespace fast_sync_entity_framework_dao.data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
    }
}
