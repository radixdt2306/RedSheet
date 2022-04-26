using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Data;
using Rx.Core.Settings;

namespace RedSheet.BoundedContext
{
    public class LoginContext : DbContext, ILoginContext
    {
        public LoginContext(MainSqlDbContext mainSqlDbContext, AdminSqlDbContext adminSqlDbContext, ServerSetting serverSetting)
        {
            MainSqlDbContext = mainSqlDbContext;
            AdminSqlDbContext = adminSqlDbContext;
            ServerSetting = serverSetting;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<vSecurityAnswer> vSecurityAnswers { get; set; }
        public DbSet<ApplicationTimeZone> ApplicationTimeZones { get; set; }

        public DbSet<PasswordPolicy> PasswordPolicies { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var isTenant = ServerSetting.Get<bool>("multiTenant");
            if(isTenant)
                optionsBuilder.UseSqlServer(AdminSqlDbContext.Database.GetDbConnection());
            else
                optionsBuilder.UseSqlServer(MainSqlDbContext.Database.GetDbConnection());
            base.OnConfiguring(optionsBuilder);
        }

        private MainSqlDbContext MainSqlDbContext;

        private AdminSqlDbContext AdminSqlDbContext;

        private ServerSetting ServerSetting;
    }


    public interface ILoginContext : IDbContext
    {
    }
}
