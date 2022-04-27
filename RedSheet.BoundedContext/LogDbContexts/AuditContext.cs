using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;
using System;

namespace RedSheet.BoundedContext
{
    public class AuditContext : DbContext, IAuditContext,IDisposable
    {
        public AuditContext(LogSqlDbContext logSqlDbContext)
        {
            LogSqlDbContext = logSqlDbContext;
            this.ChangeTracker.AutoDetectChangesEnabled = false;
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<AuditRequest> AuditRequests { get; set; }
        public DbSet<AuditRecord> AuditRecords { get; set; }

        public DbSet<AuditRecordDetail> AuditRecordDetails { get; set; }

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


    public interface IAuditContext : IDbContext
    {
    }
}
