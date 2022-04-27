using Microsoft.EntityFrameworkCore;

using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;

using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectLookupContext : DbContext, IProjectLookupContext
    {
        public ProjectLookupContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<vTemplateGroup> TemplateGroups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectLookupContext : IDbContext
    {
    }
}
