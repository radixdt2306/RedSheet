using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.Infrastructure.Multilingual;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersSearchController : Controller
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public UsersSearchController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]UserSearchModel userSearch) {
            var spParameters = new object[3];
            spParameters[0] = new SqlParameter() { ParameterName = "RoleId", Value = userSearch.RoleId };
            spParameters[1] = new SqlParameter() { ParameterName = "UserName", Value = userSearch.UserName };
            spParameters[2] = new SqlParameter() { ParameterName = "FullName", Value = userSearch.FullName };
            var result = DbContextManager.SqlQueryAsync<UserSearchViewModel>("EXEC dbo.spUsers @RoleId, @UserName, @FullName", spParameters).Result.ToList();
            return Ok(result);
        }
    }
}
