using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.Models.ViewModels;
using Rx.Core.Data;
using Rx.Core.Security;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using RedSheet.Models.Models;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuditLogController : Controller
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public AuditLogController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var languageId = Convert.ToInt64(UserClaim.Get(ClaimTypes.UserData));
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "AuditRequestId",
                Value = id
            };
            spParameters[1] = new SqlParameter()
            {
                ParameterName = "LanguageId",
                Value = languageId
            };
            var result = DbContextManager.SqlQueryAsync<AuditLogDetailViewModel>("EXEC dbo.spAuditRecordDetails @AuditRequestId, @LanguageId", spParameters).Result.ToList();
            return Ok(result);
            
        }
        [HttpPost]
        public IActionResult Post([FromBody]AuditLogSearchModel logSearch)
        {
            if (logSearch.StartDate == null)
            {
                logSearch.StartDate = new DateTime(1801, 1, 1);
            }
            if (logSearch.EndDate == null)
            {
                logSearch.EndDate = DateTime.MaxValue;
            }
            var spParameters = new object[6];
            spParameters[0] = new SqlParameter() { ParameterName = "ApplicationModuleId", Value = logSearch.ApplicationModuleId };
            spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = logSearch.UserId };
            spParameters[2] = new SqlParameter() { ParameterName = "MainRecordId", Value = logSearch.MainRecordId == null ? 0 : logSearch.MainRecordId };
            spParameters[3] = new SqlParameter() { ParameterName = "RequestMethod", Value = logSearch.RequestMethod };
            spParameters[4] = new SqlParameter() { ParameterName = "StartDate", Value = logSearch.StartDate };
            spParameters[5] = new SqlParameter() { ParameterName = "EndDate", Value = logSearch.EndDate };
            var result = DbContextManager.SqlQueryAsync<AuditLogViewModel>("EXEC dbo.spAuditRecords @ApplicationModuleId, @UserId, @MainRecordId , @RequestMethod,  @StartDate, @EndDate", spParameters).Result.ToList();
            return Ok(result);
        }


    }
}
