using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;
using Rx.Core.Data;
using Rx.Core.Security;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.ViewModels.Models;
using RedSheet.DbEntities.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RedSheet.Api.Controllers
{
    [Route("api/EmailTransaction/search")]
    public class EmailTransactionSearchController : BaseController
    {
        private int query;

        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public EmailTransactionSearchController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StoreProcSearchModel searchFilter)
            {

            var query = JObject.Parse(searchFilter.Query);

            var spParameters = new object[4];
            spParameters[0] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
            spParameters[1] = new SqlParameter() { ParameterName = "SearchBy", Value = query["Query"][0]["searchValue"].ToString() };
            spParameters[2] = new SqlParameter() { ParameterName = "OrderByDate", Value = query["Query"][0]["dateOrder"].ToString() };
            spParameters[3] = new SqlParameter() { ParameterName = "CategoryBy", Value = query["Query"][0]["emailCategory"].ToString() };
            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spEmailTransactions @UserId , @SearchBy , @OrderByDate , @CategoryBy", spParameters); // change ' dbo.spEmailTransaction ' to ' dbo.spEmailTransactions '
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

    }
}
