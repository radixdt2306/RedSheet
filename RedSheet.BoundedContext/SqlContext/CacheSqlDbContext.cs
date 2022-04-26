using Microsoft.EntityFrameworkCore;
using Rx.Core.Settings;
using System;

namespace RedSheet.BoundedContext.SqlContext
{
    public class CacheSqlDbContext : BaseDbContext, IDisposable
    {
        public CacheSqlDbContext(ServerSetting serverSetting):base(serverSetting){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.GetConnection("Cache"));
            base.OnConfiguring(optionsBuilder);
        }
    }
}
