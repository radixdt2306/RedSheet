using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectNegotionalityContext : DbContext, IProjectNegotionalityContext
    {
        public ProjectNegotionalityContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectNegotionality> ProjectNegotionalities { get; set; }

		public DbSet<OurTeamMember> OurTeamMembers { get; set; }

		public DbSet<vProjectNegotionalityRecord> vProjectNegotionalityRecords { get; set; }

		public DbSet<vOurTeamMember> vOurTeamMembers { get; set; }

		public DbSet<vOurTeamMemberRecord> vOurTeamMemberRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectNegotionalityContext : IDbContext
    {
    }
}
