using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class LiteProjectBackgroundLookupContext : DbContext, ILiteProjectBackgroundLookupContext
    {
        public LiteProjectBackgroundLookupContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<vCommunicationMode> CommunicationModes { get; set; }

		public DbSet<vLiteRelationshipRequire> LiteRelationshipRequires { get; set; }

		public DbSet<vPersonality> Personalities { get; set; }

		public DbSet<vUserLookup> UserLookups { get; set; }

		public DbSet<vValueObjective> ValueObjectives { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface ILiteProjectBackgroundLookupContext : IDbContext
    {
    }
}
