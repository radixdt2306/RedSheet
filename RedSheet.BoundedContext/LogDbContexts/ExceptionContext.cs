using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ExceptionContext : DbContext, IExceptionContext
    {
        public ExceptionContext(LogSqlDbContext logSqlDbContext)
        {
            LogSqlDbContext = logSqlDbContext;
        }

        public DbSet<ApplicationExceptionLog> ApplicationExceptionLogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(LogSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private LogSqlDbContext LogSqlDbContext;
    }


    public interface IExceptionContext : IDbContext
    {
    }
}
