using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectPostEventActionContext : DbContext, IProjectPostEventActionContext
    {
        public ProjectPostEventActionContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectImplementationPlan> ProjectImplementationPlans { get; set; }

		public DbSet<ProjectPostEventAction> ProjectPostEventActions { get; set; }

		public DbSet<ProjectCarryForward> ProjectCarryForwards { get; set; }

		public DbSet<vProjectImplementationPlan> vProjectImplementationPlans { get; set; }

		public DbSet<vProjectImplementationPlanRecord> vProjectImplementationPlanRecords { get; set; }

		public DbSet<vProjectPostEventAction> vProjectPostEventActions { get; set; }

		public DbSet<vProjectPostEventActionRecord> vProjectPostEventActionRecords { get; set; }

		public DbSet<vProjectCarryForward> vProjectCarryForwards { get; set; }

		public DbSet<vProjectCarryForwardRecord> vProjectCarryForwardRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectPostEventActionContext : IDbContext
    {
    }
}
