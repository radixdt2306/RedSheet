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
    //[Route("api/knowledgegatheringplans/search")]
    [Route("api/projectpowers/{projectPowerId}/knowledgeGatheringPlans/search")]
    public class KnowledgeGatheringPlansSearchController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public KnowledgeGatheringPlansSearchController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }
		[HttpPost]
        public  async Task<IActionResult> Post([FromBody]StoreProcSearchModel storeProcSearch) {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter() { ParameterName = "Query", Value = storeProcSearch.Query };
            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetOurTeamMemberList @Query", spParameters);
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }
        
    }
}