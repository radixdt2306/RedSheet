using Microsoft.EntityFrameworkCore;
using RedSheet.Models.ViewModels;
using RedSheet.ViewModels.Models;
using Rx.Core.Settings;
using System;
using RedSheet.DbEntities.Models;

namespace RedSheet.BoundedContext.SqlContext
{
    public class MainSqlDbContext : BaseDbContext, IDisposable
    {
        public MainSqlDbContext(ServerSetting serverSetting):base(serverSetting){}


        public DbSet<ConfigurationContentViewModel> ConfigurationContents { get; set; }

        public DbSet<LanguageContentModel> LanguageContents { get; set; }

        public DbSet<ModuleAccessModel> ModuleAccess { get; set; }

        public DbSet<ServerMessageModel> ServerMessages { get; set; }

        public DbSet<LanguageContentSearchViewModel> LanguageContentSearchResults { get; set; }

        public DbSet<ModuleContentViewModel> ModuleContents { get; set; }
        public DbSet<ExceptionLogViewModel> ExceptionLogs { get; set; }

        public DbSet<DeleteRecordViewModel> DeleteRecordViews { get; set; }

        public DbSet<DeleteValidationModel> DeleteValidationModels { get; set; }

        public DbSet<RequestLogViewModel> RequestLogs { get; set; }

        
            public DbSet<ApplicationModuleViewModel> ApplicationModules { get; set; }

        public DbSet<UserSearchViewModel> UserSearchs { get; set; }
        public DbSet<AuditLogViewModel> AuditLogViewModels { get; set; }
        public DbSet<AuditLogDetailViewModel> AuditLogDetailViewModels { get; set; }

        public DbSet<EmailTokenReplaceViewModel> EmailTokenReplaceViewModels { get; set; }      

        public DbSet<StoreProcSearchViewModel> StoreProcSearchViewModels { get; set; }
        
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.GetConnection("Main"));
            base.OnConfiguring(optionsBuilder);
        }
    }
}
