using fast_sync_core.abstraction.data;
using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq.Expressions;

namespace fast_sync_entity_framework_dao.data
{
    public class SyncableObjectDataSource<T> : ISyncableDataSource<T>
        where T : class, IWithId
    {
        private Func<FastSyncDataContext> dbContextFactory { get { return ((EntityFrameworkSyncConfiguration)FastSync.GetSyncConfiguration()).dbContextFactory; } }

        public SyncableObjectDataSource()
        {
        }


        public async Task<T> Add(T entity)
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                await _dbSet.AddAsync(entity);
                await dbContext.SaveChangesAsync();
                return entity;

            }
        }

        public async Task<List<T>> AddMany(List<T> entities)
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                await _dbSet.AddRangeAsync(entities);
                await dbContext.SaveChangesAsync();
                return entities;
            }
        }

        public async Task<int> Count()
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                return await _dbSet.CountAsync();
            }
        }

        public void Dispose()
        {
        }

        public async Task<T?> FindById(string id)
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                return await _dbSet.FindAsync(id);
            }
        }

        public async Task<List<T>> GetAll()
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                return await _dbSet.ToListAsync();
            }
        }

        public async Task<List<T>> Query(Expression<Func<T, bool>> filter)
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                List<T> filtertedList = await _dbSet.Where(filter).ToListAsync();
                return filtertedList;
            }
        }

        public async Task<T> Update(string id, T entity)
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                _dbSet.Update(entity);
                await dbContext.SaveChangesAsync();
                return entity;
            }
        }

        public async Task<List<T>> UpdateMany(List<T> entities)
        {
            using (FastSyncDataContext dbContext = dbContextFactory())
            {
                DbSet<T> _dbSet = dbContext.Set<T>();
                foreach (var entity in entities)
                {
                    if (dbContext.Entry(entity).State != EntityState.Detached)
                    {
                        dbContext.Entry(entity).State = EntityState.Detached;
                    }
                    dbContext.Update(entity);
                }
                await dbContext.SaveChangesAsync();
                return entities;
            }
        }
    }
}
