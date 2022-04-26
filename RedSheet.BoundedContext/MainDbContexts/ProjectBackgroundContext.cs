using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectBackgroundContext : DbContext, IProjectBackgroundContext
    {
        public ProjectBackgroundContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectBackground> ProjectBackgrounds { get; set; }

		public DbSet<BackgroundEvent> BackgroundEvents { get; set; }

		public DbSet<LongTermObjective> LongTermObjectives { get; set; }

		public DbSet<vBackgroundEvent> vBackgroundEvents { get; set; }

		public DbSet<vBackgroundEventRecord> vBackgroundEventRecords { get; set; }

		public DbSet<vLongTermObjective> vLongTermObjectives { get; set; }

		public DbSet<vLongTermObjectiveRecord> vLongTermObjectiveRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectBackgroundContext : IDbContext
    {
    }
}
