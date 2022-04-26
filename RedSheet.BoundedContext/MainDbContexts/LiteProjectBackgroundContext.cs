using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class LiteProjectBackgroundContext : DbContext, ILiteProjectBackgroundContext
    {
        public LiteProjectBackgroundContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<LiteProjectBackground> LiteProjectBackgrounds { get; set; }

		public DbSet<LiteTheirTeamMember> LiteTheirTeamMembers { get; set; }

		public DbSet<LiteOurTeamMember> LiteOurTeamMembers { get; set; }

		public DbSet<LiteTarget> LiteTargets { get; set; }

		public DbSet<vLiteProjectBackgroundRecord> vLiteProjectBackgroundRecords { get; set; }

		public DbSet<vLiteTheirTeamMember> vLiteTheirTeamMembers { get; set; }

		public DbSet<vLiteTheirTeamMemberRecord> vLiteTheirTeamMemberRecords { get; set; }

		public DbSet<vLiteOurTeamMember> vLiteOurTeamMembers { get; set; }

		public DbSet<vLiteOurTeamMemberRecord> vLiteOurTeamMemberRecords { get; set; }

		public DbSet<vLiteTarget> vLiteTargets { get; set; }

		public DbSet<vLiteTargetRecord> vLiteTargetRecords { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface ILiteProjectBackgroundContext : IDbContext
    {
    }
}
