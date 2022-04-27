using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;
using Rx.Core.Data;
using Rx.Core.Security;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.ViewModels.Models;
using RedSheet.Api.Constants;

namespace RedSheet.Api.Controllers
{
    [Route("api/dashboard/search")]
    public class DashboardSearchController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public DashboardSearchController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]StoreProcSearchModel storeProcSearch)
        {
            var spParameters = new object[1];            
            spParameters[0] = new SqlParameter() { ParameterName = "userId", Value = UserClaim.UserId };
            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetDashboardDetails @userId", spParameters);
            //var storeProcSearchResult1 = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetRecentActivities @userId", spParameters);
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }
  

    }
}
