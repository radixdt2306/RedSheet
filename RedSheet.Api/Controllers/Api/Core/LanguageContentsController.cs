using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class LanguageContentsController : Controller
    {
        private ILanguageContentUow LanguageContentUow { get; set; }
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public LanguageContentsController(ILanguageContentUow languageContentUow, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            LanguageContentUow = languageContentUow;
            DbContextManager = dbContextManager;
        }

        [HttpGet("{languageId}")]
        public async Task<IActionResult> Get(int languageId)
        {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "LanguageId",
                Value = languageId
            };
            var contents = await DbContextManager.SqlQueryAsync<LanguageContentSearchViewModel>("EXEC spLanguageContentSearch @LanguageId", spParameters);
            return Ok(contents);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]TranslationTextModel translationText)
        {
            
            var spParameters = new object[3];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "LanguageContentId",
                Value = translationText.ContentId
            };
            spParameters[1] = new SqlParameter()
            {
                ParameterName = "LanguageName",
                Value = (object)translationText.LanguageName ?? DBNull.Value
            };
            spParameters[2] = new SqlParameter()
            {
                ParameterName = "Value",
                Value = (object)translationText.Value ?? DBNull.Value
            };
            await DbContextManager.SqlQueryAsync<LanguageContentModel>("EXEC dbo.spUpdateLanguageContent @LanguageContentId, @LanguageName, @Value", spParameters);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var findObject = LanguageContentUow.Repository<LanguageContent>().FindByKey(id);
            LanguageContentUow.RegisterDeleted<LanguageContent>(findObject);
            LanguageContentUow.Commit();
            return NoContent();
        }
    }
}
