using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Linq;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class EntityLogsController : Controller
    {
        private IDbContextManager<LogSqlDbContext> DbContextManager { get; set; }
        public EntityLogsController(IDbContextManager<LogSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }

        [HttpPost]
        public IActionResult Post(EntityLogSearchModel entityLogSearch) {
            var spParameters = new object[3];
            spParameters[0] = new SqlParameter() { ParameterName = "ApplicationModuleId", Value = entityLogSearch.ApplicationModuleId };
            spParameters[1] = new SqlParameter() { ParameterName = "MainRecordId", Value = entityLogSearch.MainRecordId };
            spParameters[2] = new SqlParameter() { ParameterName = "Action", Value = entityLogSearch.Action };
            var result = DbContextManager.SqlQueryAsync<ModuleAccessModel>("EXEC dbo.spEntityLogs @ApplicationModuleId, @MainRecordId, @Action", spParameters).Result.ToList();
            return Ok();
        }
    }
}
