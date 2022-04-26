using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.Models.ViewModels;
using RedSheet.UnitOfWork;
using Rx.Core.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Models.Models;
using System;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class LanguageModuleContentController : BaseController
    {

        private IMasterUow MasterUow { get; set; }
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public LanguageModuleContentController(IDbContextManager<MainSqlDbContext> dbContextManager, IMasterUow masterUow)
        {
            DbContextManager = dbContextManager;
            MasterUow = masterUow;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]EmailTokenReplaceSearchModel emailTokenReplaceSearchModel)
        {
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "ApplicationModuleId", Value = emailTokenReplaceSearchModel.ApplicationModuleId };
            spParameters[1] = new SqlParameter() { ParameterName = "Action", Value = (object)emailTokenReplaceSearchModel.Action ?? DBNull.Value };
            var result = await DbContextManager.SqlQueryAsync<EmailTokenReplaceViewModel>("EXEC spLanguageModuleContents @ApplicationModuleId, @Action", spParameters);
            return Ok(result);
        }
    }
}
