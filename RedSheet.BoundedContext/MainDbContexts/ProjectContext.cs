using Microsoft.EntityFrameworkCore;

using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;

using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectContext : DbContext, IProjectContext
    {
        public ProjectContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<Project> Projects { get; set; }

        public DbSet<vProjectRecord> vProjectRecords { get; set; }

        public DbSet<ProjectModuleAssigneesOrReviewer> ProjectModuleAssigneesOrReviewers { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectContext : IDbContext
    {
    }
}
