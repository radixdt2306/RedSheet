using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectEventTimelineContext : DbContext, IProjectEventTimelineContext
    {
        public ProjectEventTimelineContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectEventTimeline> ProjectEventTimelines { get; set; }

		public DbSet<ArrivalAndOpeningTactic> ArrivalAndOpeningTactics { get; set; }

		public DbSet<EventAgendaTiming> EventAgendaTimings { get; set; }

		public DbSet<vProjectEventTimelineRecord> vProjectEventTimelineRecords { get; set; }

		public DbSet<vArrivalAndOpeningTactic> vArrivalAndOpeningTactics { get; set; }

		public DbSet<vEventAgendaTiming> vEventAgendaTimings { get; set; }

		public DbSet<vEventAgendaTimingRecord> vEventAgendaTimingRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectEventTimelineContext : IDbContext
    {
    }
}
