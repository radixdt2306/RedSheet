using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectRequirementContext : DbContext, IProjectRequirementContext
    {
        public ProjectRequirementContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectRequirement> ProjectRequirements { get; set; }

		public DbSet<OurRequirementDetail> OurRequirementDetails { get; set; }

		public DbSet<TheirRequirementDetail> TheirRequirementDetails { get; set; }

		public DbSet<Ourbatna> Ourbatnas { get; set; }

		public DbSet<TheirBatna> TheirBatnas { get; set; }

		public DbSet<vOurRequirementDetail> vOurRequirementDetails { get; set; }

		public DbSet<vOurRequirementDetailRecord> vOurRequirementDetailRecords { get; set; }

		public DbSet<vTheirRequirementDetail> vTheirRequirementDetails { get; set; }

		public DbSet<vTheirRequirementDetailRecord> vTheirRequirementDetailRecords { get; set; }

		public DbSet<vTheirBatna> vTheirBatnas { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectRequirementContext : IDbContext
    {
    }
}
