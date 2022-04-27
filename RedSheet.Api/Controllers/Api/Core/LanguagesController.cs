using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class LanguagesController : Controller
    {
        private ILanguageContentUow LanguageContentUow { get; set; }
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public LanguagesController(ILanguageContentUow languageContentUow, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            LanguageContentUow = languageContentUow;
            DbContextManager = dbContextManager;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok(LanguageContentUow.Repository<vLanguage>().All());
        }

        [HttpPut]
        public IActionResult Put([FromBody]Language language) {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "LanguageId",
                Value = language.LanguageId
            };
            DbContextManager.SqlQueryAsync<LanguageContentModel>("EXEC spUpdateLanguages @LanguageId", spParameters);
            return NoContent();
        }
    }
}
