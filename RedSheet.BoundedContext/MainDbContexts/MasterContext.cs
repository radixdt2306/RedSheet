using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Cache;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class MasterContext : DbContext, IMasterContext
    {
        public MasterContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
        }

        public DbSet<vLanguage> Languages { get; set; }

        public DbSet<vGeneratorContextModule> GeneratorContextModules{ get; set; }
        public DbSet<CacheKey> CacheKeys { get; set; }
        public DbSet<ModuleMaster> ModuleMasters { get; set; }
        public DbSet<ApplicationModule> ApplicationModules { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        public DbSet<vApplicationModule> vApplicationModules { get; set; }

        public DbSet<vApplicationExceptionLog> vApplicationExceptionLogs { get; set; }

        public DbSet<EmailTemplate> EmailTemplates { get; set; }


       // public DbSet<EmailTemplateDetail> EmailTemplateDetails { get; set; }

      //  public DbSet<vEmailTemplate> vEmailTemplates { get; set; }

        public DbSet<GlobalSetting> GlobalSettings { get; set; }

        public DbSet<vRequestLog> vRequestLogs { get; set; }

      //  public DbSet<vRole> vRoles { get; set; }

        //public DbSet<EmailConfiguration> EmailConfigurations { get; set; }

     //   public DbSet<PasswordPolicy> PasswordPolicies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IMasterContext : IDbContext
    {
    }
}
