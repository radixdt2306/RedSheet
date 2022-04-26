using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectCulturePlanContext : DbContext, IProjectCulturePlanContext
    {
        public ProjectCulturePlanContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectCulturePlan> ProjectCulturePlans { get; set; }

		public DbSet<vProjectCulturePlan> vProjectCulturePlans { get; set; }

		public DbSet<vProjectCulturePlanRecord> vProjectCulturePlanRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectCulturePlanContext : IDbContext
    {
    }
}
