using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectNegotiationContext : DbContext, IProjectNegotiationContext
    {
        public ProjectNegotiationContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<ProjectNegotiation> ProjectNegotiations { get; set; }

		public DbSet<TheirTeamMember> TheirTeamMembers { get; set; }

		public DbSet<Target> Targets { get; set; }

		public DbSet<vProjectNegotiationRecord> vProjectNegotiationRecords { get; set; }

		public DbSet<vTheirTeamMember> vTheirTeamMembers { get; set; }

		public DbSet<vTheirTeamMemberRecord> vTheirTeamMemberRecords { get; set; }

		public DbSet<vTarget> vTargets { get; set; }

		public DbSet<vTargetRecord> vTargetRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectNegotiationContext : IDbContext
    {
    }
}
