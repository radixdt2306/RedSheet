using Microsoft.EntityFrameworkCore;
using Rx.Core.Settings;

namespace RedSheet.BoundedContext.SqlContext
{
    public class AdminSqlDbContext : BaseDbContext
    {
        public AdminSqlDbContext(ServerSetting serverSetting):base(serverSetting)
        {}


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.GetConnection("admin"));
            base.OnConfiguring(optionsBuilder);
        }
    }

    
    public interface IAdminDbContextManager { }
}
