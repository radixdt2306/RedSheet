using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;

namespace RedSheet.BoundedContext
{
    public class MasterLookupContext : DbContext, IMasterLookupContext
    {
        public MasterLookupContext(MainSqlDbContext mainSqlDbContext)
        {
            MainSqlDbContext = mainSqlDbContext;
        }

        public DbSet<vMainModuleMaster> MainModuleMasters { get; set; }
        public DbSet<vModuleMaster> ModuleMasters { get; set; }

        public DbSet<vApplicationModuleMaster> ApplicationModuleMasters { get; set; }

        public DbSet<vUser> vUsers { get; set; }

        public DbSet<vLanguageContentType> LanguageContentTypes { get; set; }

        public DbSet<vRecordStatus> RecordStatuss { get; set; }

        public DbSet<vDbOperationType> DbOperationTypes { get; set; }

        public DbSet<vLanguageContentName> LanguageContentNames { get; set; }
        public DbSet<vApplicationTimeZone> vApplicationTimeZones { get; set; }
       public DbSet<vRole> vRoles { get; set; }

        public DbSet<SecurityQuestion> SecurityQuestions { get; set; }
        public DbSet<vApplicationModuleMaster> vApplicationModuleMasters { get; set; }
        public DbSet<vActiveLanguage> vActiveLanguages { get; set; }

        public DbSet<vLanguage> vLanguages { get; set; }


        public DbSet<GlobalSetting> GlobalSettings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;
    }


    public interface IMasterLookupContext : IDbContext
    {
    }
}
