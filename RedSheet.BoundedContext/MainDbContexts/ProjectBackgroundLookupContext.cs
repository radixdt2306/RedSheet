using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectBackgroundLookupContext : DbContext, IProjectBackgroundLookupContext
    {
        public ProjectBackgroundLookupContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<vNegotiationType> NegotiationTypes { get; set; }

		public DbSet<vRelationshipRequire> RelationshipRequires { get; set; }

		public DbSet<vValueObjective> ValueObjectives { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectBackgroundLookupContext : IDbContext
    {
    }
}
