using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.Models.ViewModels;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Linq;
using System;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class RequestLogsController : Controller
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        private IMasterUow MasterUow { get; set; }
        public RequestLogsController(IDbContextManager<MainSqlDbContext> dbContextManager,IMasterUow masterUow)
        {
            DbContextManager = dbContextManager;
            MasterUow = masterUow;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var result = MasterUow.Repository<vRequestLog>().SingleOrDefault(t=>t.RequestLogId == id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Post([FromBody]LogSearchModel logSearch)
        {
            var spParameters = new object[4];
            if (logSearch.StartDate == null)
            {
                logSearch.StartDate = new DateTime(1801, 1, 1);
            }
            if (logSearch.EndDate == null)
            {
                logSearch.EndDate = DateTime.MaxValue;
            }
            spParameters[0] = new SqlParameter() { ParameterName = "UserId", Value = logSearch.UserId };
            spParameters[1] = new SqlParameter() { ParameterName = "ApplicationModuleId", Value = logSearch.ApplicationModuleId };
            spParameters[2] = new SqlParameter() { ParameterName = "StartDate", Value = logSearch.StartDate };
            spParameters[3] = new SqlParameter() { ParameterName = "EndDate", Value = logSearch.EndDate };
            var result = DbContextManager.SqlQueryAsync<RequestLogViewModel>("EXEC dbo.spRequestLogs @UserId, @ApplicationModuleId, @StartDate, @EndDate", spParameters).Result.ToList();
            return Ok(result);
        }
    }
}
