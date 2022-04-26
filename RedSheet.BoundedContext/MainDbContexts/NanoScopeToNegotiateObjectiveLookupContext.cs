using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class NanoScopeToNegotiateObjectiveLookupContext : DbContext, INanoScopeToNegotiateObjectiveLookupContext
    {
        public NanoScopeToNegotiateObjectiveLookupContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<vCommunicationMode> CommunicationModes { get; set; }

		public DbSet<vNanoRelationshipRequire> NanoRelationshipRequires { get; set; }

		public DbSet<vNanoScopeToNegotiate> NanoScopeToNegotiates { get; set; }

		public DbSet<vValueObjective> ValueObjectives { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface INanoScopeToNegotiateObjectiveLookupContext : IDbContext
    {
    }
}
