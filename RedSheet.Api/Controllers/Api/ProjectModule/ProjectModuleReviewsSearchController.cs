using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;
using Rx.Core.Data;
using Rx.Core.Security;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.ViewModels.Models;
namespace RedSheet.Api.Controllers
{
    [Route("api/projectmodulereviews/search")]
    public class ProjectModuleReviewsSearchController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public ProjectModuleReviewsSearchController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }
		[HttpPost]
        public  async Task<IActionResult> Post(StoreProcSearchModel storeProcSearch) {
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "Query", Value = storeProcSearch.Query };
			spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spProjectModuleReviews @Query, @UserId", spParameters);
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }
        
    }
}