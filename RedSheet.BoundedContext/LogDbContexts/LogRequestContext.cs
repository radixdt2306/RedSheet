using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;
using System;

namespace RedSheet.BoundedContext
{
    public class LogRequestContext : DbContext, ILogRequestContext, IDisposable
    {
        public LogRequestContext(LogSqlDbContext logSqlDbContext)
        {
            LogSqlDbContext = logSqlDbContext;
            this.ChangeTracker.AutoDetectChangesEnabled = false;
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<RequestLog> RequestLogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(LogSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        public override void Dispose()
        {
            base.Dispose();
        }

        private LogSqlDbContext LogSqlDbContext;
    }


    public interface ILogRequestContext : IDbContext
    {
    }
}
