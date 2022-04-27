using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class NanoScopeToNegotiateObjectiveContext : DbContext, INanoScopeToNegotiateObjectiveContext
    {
        public NanoScopeToNegotiateObjectiveContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<NanoScopeToNegotiateObjective> NanoScopeToNegotiateObjectives { get; set; }

		public DbSet<NanoOurObjective> NanoOurObjectives { get; set; }

		public DbSet<vNanoScopeToNegotiateObjectiveRecord> vNanoScopeToNegotiateObjectiveRecords { get; set; }

		public DbSet<vNanoOurObjective> vNanoOurObjectives { get; set; }

		public DbSet<vNanoOurObjectiveRecord> vNanoOurObjectiveRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface INanoScopeToNegotiateObjectiveContext : IDbContext
    {
    }
}
