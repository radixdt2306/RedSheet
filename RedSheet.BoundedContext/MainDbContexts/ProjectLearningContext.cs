using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectLearningContext : DbContext, IProjectLearningContext
    {
        public ProjectLearningContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectOutcomeAndLearning> ProjectOutcomeAndLearnings { get; set; }

		public DbSet<vProjectOutcomeAndLearning> vProjectOutcomeAndLearnings { get; set; }

		public DbSet<vProjectOutcomeAndLearningRecord> vProjectOutcomeAndLearningRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectLearningContext : IDbContext
    {
    }
}
