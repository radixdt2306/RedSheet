using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectPreparationContext : DbContext, IProjectPreparationContext
    {
        public ProjectPreparationContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectPreparation> ProjectPreparations { get; set; }

		public DbSet<EventPlanningAction> EventPlanningActions { get; set; }

		public DbSet<CommunicationPlan> CommunicationPlans { get; set; }

		public DbSet<vProjectPreparationRecord> vProjectPreparationRecords { get; set; }

		public DbSet<vEventPlanningAction> vEventPlanningActions { get; set; }

		public DbSet<vEventPlanningActionRecord> vEventPlanningActionRecords { get; set; }

		public DbSet<vCommunicationPlan> vCommunicationPlans { get; set; }

		public DbSet<vCommunicationPlanRecord> vCommunicationPlanRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectPreparationContext : IDbContext
    {
    }
}
