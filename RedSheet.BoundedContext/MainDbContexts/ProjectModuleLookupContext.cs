using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class ProjectModuleLookupContext : DbContext, IProjectModuleLookupContext
    {
        public ProjectModuleLookupContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
			this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
		
		public DbSet<vProjectModuleAssignee> ProjectModuleAssignees { get; set; }

		public DbSet<vProjectModuleReviewer> ProjectModuleReviewers { get; set; }

		public DbSet<vTactic> Tactics { get; set; }

		public DbSet<vTemplateModule> TemplateModules { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IProjectModuleLookupContext : IDbContext
    {
    }
}
