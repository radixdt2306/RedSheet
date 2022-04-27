using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.Infrastructure.Multilingual;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System;
using RedSheet.Infrastructure.Extensions;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class SearchModuleContentsController : Controller
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        private ILanguageContent LanguageContentDomain { get; set; }
        public SearchModuleContentsController(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ModuleContentModel moduleContent) {
            var spParameters = new object[4];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "ApplicationModuleId",
                Value = moduleContent.ApplicationModuleId
            };
            spParameters[1] = new SqlParameter()
            {
                ParameterName = "LanguageContentType",
                Value = (object)moduleContent.LanguageContentType ?? DBNull.Value
            };
            spParameters[2] = new SqlParameter()
            {
                ParameterName = "OperationType",
                Value = (object)moduleContent.OperationType.GetOperationType() ?? DBNull.Value
            };
            spParameters[3] = new SqlParameter()
            {
                ParameterName = "LanguageName",
                Value = (object)moduleContent.LanguageName ?? DBNull.Value
            };
            var result = await DbContextManager.SqlQueryAsync<ModuleContentViewModel>("EXEC spSearchModuleContents @ApplicationModuleId, @LanguageContentType, @OperationType, @LanguageName", spParameters);
            return Ok(result);
        }
    }
}
