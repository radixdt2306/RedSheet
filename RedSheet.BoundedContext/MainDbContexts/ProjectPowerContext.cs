using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectPowerContext : DbContext, IProjectPowerContext
    {
        public ProjectPowerContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectPower> ProjectPowers { get; set; }

		public DbSet<KnowledgeGatheringPlan> KnowledgeGatheringPlans { get; set; }

		public DbSet<PowerTypeDetail> PowerTypeDetails { get; set; }

		public DbSet<vProjectPowerRecord> vProjectPowerRecords { get; set; }

		public DbSet<vKnowledgeGatheringPlan> vKnowledgeGatheringPlans { get; set; }

		public DbSet<vKnowledgeGatheringPlanRecord> vKnowledgeGatheringPlanRecords { get; set; }

		public DbSet<vPowerTypeDetail> vPowerTypeDetails { get; set; }

		public DbSet<vPowerTypeDetailRecord> vPowerTypeDetailRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectPowerContext : IDbContext
    {
    }
}
