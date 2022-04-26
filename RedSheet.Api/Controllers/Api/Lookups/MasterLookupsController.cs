using Microsoft.AspNetCore.Mvc;
using RedSheet.Api.Constants;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.Models.ViewModels;
using RedSheet.UnitOfWork;
using Rx.Core.Cache;
using Rx.Core.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class MasterLookupsController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        private IMasterLookupUow MasterLookupUow { get; set; }
        public MasterLookupsController(IMasterLookupUow masterLookupUow, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            MasterLookupUow = masterLookupUow;
            DbContextManager = dbContextManager;
        }

        [HttpGet(MasterLookups.Languages)]
        //[TypeFilter(typeof(Cachable), Arguments = new object[] { "languages", new string[] {  }, false })]
        public async Task<IEnumerable<vActiveLanguage>> GetLanguages()
        {
            return await MasterLookupUow.Repository<vActiveLanguage>().AllAsync();
        }

        [HttpGet(MasterLookups.MainModuleMasters)]
        public async Task<IEnumerable<vMainModuleMaster>> GetMainModuleMasters()
        {
            return await MasterLookupUow.Repository<vMainModuleMaster>().AllAsync();
        }

        [HttpGet(MasterLookups.ModuleMasters)]
        public async Task<IEnumerable<vModuleMaster>> GetModuleMasters()
        {
            return await MasterLookupUow.Repository<vModuleMaster>().AllAsync();
        }

        [HttpGet(MasterLookups.ApplicationTimeZones)]
        public async Task<IEnumerable<vApplicationTimeZone>> GetApplicationTimeZones()
        {
            return await MasterLookupUow.Repository<vApplicationTimeZone>().AllAsync();
        }


        [HttpGet(MasterLookups.Users)]
        public async Task<IEnumerable<vUser>> GetUsers()
        {
            return await MasterLookupUow.Repository<vUser>().AllAsync();
        }

        [HttpGet(MasterLookups.ApplicationModules)]
        public List<ApplicationModuleViewModel> GetApplicationModules()
        {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "UserId",
                Value = 0
            };
            return DbContextManager.SqlQueryAsync<ApplicationModuleViewModel>("EXEC spApplicationModules @UserId", spParameters).Result.ToList();
        }
        [HttpGet(MasterLookups.ApplicationModuleMasters)]
        public async Task<IEnumerable<vApplicationModuleMaster>> GetApplicationModuleMasters()
        {
            return await MasterLookupUow.Repository<vApplicationModuleMaster>().AllAsync();
        }

        
        [HttpGet(MasterLookups.ServerMessages)]
        public async Task<IEnumerable<ServerMessage>> GetServerMessages()
        {
            return await MasterLookupUow.Repository<ServerMessage>().AllAsync();
        }

        [HttpGet(MasterLookups.DbOperationTypes)]
        public async Task<IEnumerable<vDbOperationType>> GetDbOperationTypes()
        {
            return await MasterLookupUow.Repository<vDbOperationType>().AllAsync();
        }

        [HttpGet(MasterLookups.LanguageContentTypes)]
        public async Task<IEnumerable<vLanguageContentType>> GetLanguageContentTypes()
        {
            return await MasterLookupUow.Repository<vLanguageContentType>().AllAsync();
        }

        [HttpGet(MasterLookups.Roles)]
        public async Task<IEnumerable<vRole>> GetRoles()
        {
            return await MasterLookupUow.Repository<vRole>().AllAsync();
        }

        [HttpGet(MasterLookups.SecurityQuestions)]
        public async Task<IEnumerable<SecurityQuestion>> GetSecurityQuestions()
        {
            return await MasterLookupUow.Repository<SecurityQuestion>().AllAsync();
        }

        [HttpGet(MasterLookups.RecordStatuses)]
        public async Task<IEnumerable<vRecordStatus>> GetRecordStatuses()
        {
            return await MasterLookupUow.Repository<vRecordStatus>().AllAsync();
        }

        [HttpGet(MasterLookups.LanguageContentNames)]
        public async Task<IEnumerable<vLanguageContentName>> GetLanguageContentNames()
        {
            return await MasterLookupUow.Repository<vLanguageContentName>().AllAsync();
        }

        [HttpGet(MasterLookups.GlobalSettings)]
        public async Task<IEnumerable<GlobalSetting>> GetGlobalSettings()
        {
            return await MasterLookupUow.Repository<GlobalSetting>().AllAsync();
        }
    }
}
