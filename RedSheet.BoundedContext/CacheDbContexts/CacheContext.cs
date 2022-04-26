using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using Rx.Core.Cache;

namespace RedSheet.BoundedContext
{
    public class CacheContext : DbContext, ICacheContext
    {
        public CacheContext(CacheSqlDbContext cacheSqlDbContext)
        {
            CacheSqlDbContext = cacheSqlDbContext;
            this.ChangeTracker.AutoDetectChangesEnabled = false;
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public DbSet<CacheKey> CacheKeys { get; set; }

        public DbSet<CacheCollection> CacheCollections { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
            optionsBuilder.UseSqlServer(CacheSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private CacheSqlDbContext CacheSqlDbContext;
    }
}
