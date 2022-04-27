using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectModuleContext : DbContext, IProjectModuleContext
    {
        public ProjectModuleContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectModule> ProjectModules { get; set; }

		public DbSet<ProjectImplementationPlan> ProjectImplementationPlans { get; set; }

		public DbSet<ProjectPostEventAction> ProjectPostEventActions { get; set; }

		public DbSet<ProjectCarryForward> ProjectCarryForwards { get; set; }

		public DbSet<ProjectZoma> ProjectZomas { get; set; }

		public DbSet<ProjectModuleReview> ProjectModuleReviews { get; set; }

		public DbSet<NanoProjectNegotiable> NanoProjectNegotiables { get; set; }

		public DbSet<NanoOurBatna> NanoOurBatnas { get; set; }

		public DbSet<NanoTheirBatna> NanoTheirBatnas { get; set; }

		public DbSet<NanoDiscussionSequence> NanoDiscussionSequences { get; set; }

		public DbSet<vProjectModuleRecord> vProjectModuleRecords { get; set; }

		public DbSet<vProjectImplementationPlan> vProjectImplementationPlans { get; set; }

		public DbSet<vProjectImplementationPlanRecord> vProjectImplementationPlanRecords { get; set; }

		public DbSet<vProjectPostEventAction> vProjectPostEventActions { get; set; }

		public DbSet<vProjectPostEventActionRecord> vProjectPostEventActionRecords { get; set; }

		public DbSet<vProjectCarryForward> vProjectCarryForwards { get; set; }

		public DbSet<vProjectCarryForwardRecord> vProjectCarryForwardRecords { get; set; }

		public DbSet<vProjectModuleReviewRecord> vProjectModuleReviewRecords { get; set; }

		public DbSet<vNanoProjectNegotiable> vNanoProjectNegotiables { get; set; }

		public DbSet<vNanoProjectNegotiableRecord> vNanoProjectNegotiableRecords { get; set; }

		public DbSet<vNanoOurBatna> vNanoOurBatnas { get; set; }

		public DbSet<vNanoOurBatnaRecord> vNanoOurBatnaRecords { get; set; }

		public DbSet<vNanoTheirBatna> vNanoTheirBatnas { get; set; }

		public DbSet<vNanoTheirBatnaRecord> vNanoTheirBatnaRecords { get; set; }

		public DbSet<vNanoDiscussionSequence> vNanoDiscussionSequences { get; set; }

		public DbSet<vNanoDiscussionSequenceRecord> vNanoDiscussionSequenceRecords { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectModuleContext : IDbContext
    {
    }
}
