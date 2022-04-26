using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Extensions;
using RedSheet.Infrastructure.Multilingual;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class ModuleContentsController : Controller
    {
        private ILanguageContentUow LanguageContentUow { get; set; }

        private ILanguageContent LanguageContentDomain { get; set; }

        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public ModuleContentsController(ILanguageContentUow languageContentUow,ILanguageContent languageContentDomain, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            LanguageContentUow = languageContentUow;
            LanguageContentDomain = languageContentDomain;
            DbContextManager = dbContextManager;
        }

        //[TypeFilter(typeof(Cachable), Arguments = new object[] { "moduleContents",new string[] { "languageName","actionType","applicationModuleId" }, false })]
        [HttpGet("{languageName}/{actionType}/{applicationModuleId}")]
        public IActionResult Get(string languageName,string actionType, int applicationModuleId) {
            return Ok(this.LanguageContentDomain.Get(applicationModuleId, actionType, languageName));
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ModuleContentModel moduleContent) {
            var moduleContentObject = new ModuleContent
            {
                LanguageContentType = moduleContent.LanguageContentType.ToCamelCase(),
                ApplicationModuleId = moduleContent.ApplicationModuleId,
                Action = moduleContent.OperationType.GetOperationType(),
                LanguageContentId = moduleContent.LanguageContentId,
            };
            var find = this.LanguageContentUow.Repository<ModuleContent>().SingleOrDefault(t => t.ApplicationModuleId == moduleContent.ApplicationModuleId && t.Action == moduleContentObject.Action && t.LanguageContentType == moduleContentObject.LanguageContentType && t.LanguageContentId == moduleContent.LanguageContentId);
            if (find == null) {
                this.LanguageContentUow.RegisterNew<ModuleContent>(moduleContentObject);
                this.LanguageContentUow.Commit();
            }
            return Ok(moduleContentObject);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]TranslationTextModel translationText) {
            var spParameters = new object[3];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "ModuleContentId",
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
            var result = await DbContextManager.SqlQueryAsync<LanguageContentModel>("EXEC spUpdateModuleContent @ModuleContentId, @LanguageName, @Value", spParameters);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var moduleContent = this.LanguageContentUow.Repository<ModuleContent>().FindByKey(id);
            this.LanguageContentUow.RegisterDeleted<ModuleContent>(moduleContent);
            this.LanguageContentUow.Commit();
            return Ok(id);
        }
    }
}
