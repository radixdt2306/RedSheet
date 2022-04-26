using Microsoft.EntityFrameworkCore;
using Rx.Core.Security;
using Rx.Core.Settings;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;

namespace RedSheet.BoundedContext.SqlContext
{
    public class BaseDbContext : DbContext
    {

        private const string ConnectionString = "data source={0};initial catalog={1};persist security info=True;User Id={2};Password={3};MultipleActiveResultSets=True;App=EntityFramework";
        public BaseDbContext(ServerSetting serverSetting)
        {
            ServerSetting = serverSetting;
        }

        public DbConnection GetConnection(string keyName)
        {
            var dbConnectionString = ServerSetting.Get<string>(string.Join(".", new string[] { "dbConnection", keyName.ToLower() }));
            if (!string.IsNullOrEmpty(dbConnectionString))
            {
                SqlDbConnection = new SqlConnection(dbConnectionString);
                return SqlDbConnection;
            }
            else
            {
                var tenantDbConnectionString = string.Format(ConnectionString, UserClaim.DbServer, string.Join(string.Empty, UserClaim.CompanyName, keyName, "Db"), string.Join(UserClaim.CompanyName, "User"), string.Join(UserClaim.CompanyName, ""));
                SqlDbConnection = new SqlConnection(tenantDbConnectionString);
                return SqlDbConnection;
            }
        }

        private ServerSetting ServerSetting;

        private DbConnection SqlDbConnection;
        private Dictionary<string, DbConnection> DbConnections { get; set; } = new Dictionary<string, DbConnection>();
    }



}
