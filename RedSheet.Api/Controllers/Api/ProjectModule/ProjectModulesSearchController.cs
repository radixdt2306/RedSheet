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
    [Route("api/ProjectModules/{isLeftMenu}/search")]
    public class projectModulesSearchController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public projectModulesSearchController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }   
        [HttpPost]
        public async Task<IActionResult> Post(bool isLeftMenu,[FromBody]StoreProcSearchModel storeProcSearch)
        {
            if (isLeftMenu)
            {
                var spParameters = new object[2];
                //spParameters[0] = new SqlParameter() { ParameterName = "Query", Value = storeProcSearch.Query };
                spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = storeProcSearch.Query };
                spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
                var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spProjectModules @ProjectModuleId,@UserId", spParameters);
                return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
            }
            else
            {
                var spParameters = new object[1];
                spParameters[0] = new SqlParameter() { ParameterName = "Query", Value = storeProcSearch.Query };
                var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spProjectModuleRoleRights @Query", spParameters);
                return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
            }
        }
       

    }
}