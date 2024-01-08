using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace fast_sync_entity_framework_dao.data
{
    public class SyncableObjectDataSource<T> : ISyncableDataSource<T>
        where T : class, IWithId
    {
        private readonly DbContext _context;
        private readonly DbSet<T> _dbSet;

        public SyncableObjectDataSource(DbContext dataContext)
        {
            _context = dataContext;
            _dbSet = _context.Set<T>();
        }

        public async Task<T> Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<T>> AddMany(List<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
            return entities;
        }

        public async Task<int> Count()
        {
            return await _dbSet.CountAsync();
        }

        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
        }

        public async Task<T?> FindById(string id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<List<T>> Query(Expression<Func<T, bool>> filter)
        {
            List<T> filtertedList = await _dbSet.Where(filter).ToListAsync();
            return filtertedList;
        }

        public async Task<T> Update(string id, T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<T>> UpdateMany(List<T> entities)
        {
            _context.UpdateRange(entities);
            await _context.SaveChangesAsync();
            return entities;
        }
    }
}
