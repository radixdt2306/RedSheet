using Microsoft.EntityFrameworkCore;
using Rx.Core.Settings;
using System;

namespace RedSheet.BoundedContext.SqlContext
{
    public class LogSqlDbContext : BaseDbContext, IDisposable
    {
        public LogSqlDbContext(ServerSetting serverSetting):base(serverSetting) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.GetConnection("Log"));
            base.OnConfiguring(optionsBuilder);
        }
    }
}
