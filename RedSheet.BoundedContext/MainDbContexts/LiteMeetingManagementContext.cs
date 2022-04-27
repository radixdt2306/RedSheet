using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class LiteMeetingManagementContext : DbContext, ILiteMeetingManagementContext
    {
        public LiteMeetingManagementContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<LiteMeetingManagement> LiteMeetingManagements { get; set; }

		public DbSet<LiteMeetingPlanning> LiteMeetingPlannings { get; set; }

		public DbSet<LiteMeetingManagementTiming> LiteMeetingManagementTimings { get; set; }

		public DbSet<LiteEventPlanningAction> LiteEventPlanningActions { get; set; }

		public DbSet<vLiteMeetingManagementRecord> vLiteMeetingManagementRecords { get; set; }

		public DbSet<vLiteMeetingPlanning> vLiteMeetingPlannings { get; set; }

		public DbSet<vLiteMeetingPlanningRecord> vLiteMeetingPlanningRecords { get; set; }

		public DbSet<vLiteMeetingManagementTiming> vLiteMeetingManagementTimings { get; set; }

		public DbSet<vLiteMeetingManagementTimingRecord> vLiteMeetingManagementTimingRecords { get; set; }

		public DbSet<vLiteEventPlanningAction> vLiteEventPlanningActions { get; set; }

		public DbSet<vLiteEventPlanningActionRecord> vLiteEventPlanningActionRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface ILiteMeetingManagementContext : IDbContext
    {
    }
}
