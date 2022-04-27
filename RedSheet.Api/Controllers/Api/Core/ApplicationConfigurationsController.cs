using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json.Linq;

using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;

using Rx.Core.Cache;
using Rx.Core.Data;
using Rx.Core.Security;
using Rx.Core.Settings;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using RedSheet.DbEntities.Constants;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationConfigurationsController : Controller
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        private IMasterUow MasterUow { get; set; }

        private IRecentActivityAndNotificationUow RecentActivityAndNotificationUow { get; set; }

        private ClientSetting ClientSetting { get; set; }
        public ApplicationConfigurationsController(IRecentActivityAndNotificationUow recentActivityAndNotificationUow,
            IDbContextManager<MainSqlDbContext> dbContextManager,
            ClientSetting clientSetting, IMasterUow masterUow
            //IWebHostEnvironment webHostEnvironment
            )
        {
            DbContextManager = dbContextManager;
            ClientSetting = clientSetting;
            MasterUow = masterUow;
            RecentActivityAndNotificationUow = recentActivityAndNotificationUow;
        }

        [HttpGet(RedSheet.Api.Constants.ActionNames.languages)]
        //[HttpGet("{languageName}")]

        //[TypeFilter(typeof(Cachable), Arguments = new object[] { "applicationconfigurations", new string[] { "languageName" }, false })]
        public IActionResult Get(string languageName)
        {
            languageName = languageName == "defaultlanguage" ? ClientSetting.Configuration["defaultLanguage"].ToString() : languageName;
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter() { ParameterName = "ColumnName", Value = languageName };
            var configurationContents = DbContextManager.SqlQueryAsync<ConfigurationContentViewModel>("EXEC dbo.spConfigurationContents @ColumnName", spParameters).Result.ToList();
            foreach (var configurationContent in configurationContents)
            {
                var keys = configurationContent.Name.Split('.');
                JToken token = null;
                for (var i = 0; i < keys.Length; i++)
                {
                    if (i == (keys.Length - 1))
                    {
                        token[keys[i]] = configurationContent.Text;
                    }
                    else if (i == 0)
                    {
                        token = ClientSetting.Configuration[keys[i]];
                    }
                    else
                    {
                        token = token[keys[i]];
                    }
                }
            }
            return Ok(ClientSetting.Configuration);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter() { ParameterName = "userId", Value = UserClaim.UserId };
            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetNotifications @userId", spParameters);
            //var storeProcSearchResult1 = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetRecentActivities @userId", spParameters);
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

        [HttpGet(RedSheet.Api.Constants.ActionNames.notifications)]
        public IActionResult Get(int id)
        {
            var recentActivityAndNotificationObject = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().FirstOrDefault(t => t.RecentActivityAndNotificationId == id);

            recentActivityAndNotificationObject.IsSeen = true;
            RecentActivityAndNotificationUow.RegisterDirty<RecentActivityAndNotification>(recentActivityAndNotificationObject);
            RecentActivityAndNotificationUow.Commit();
            return Ok(recentActivityAndNotificationObject.ProjectModuleId);
        }

        [HttpGet("UserGuide")]
        public IActionResult DownloadUserGuide()
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), string.Concat(ApplicationConstants.USER_GUIDE_FILE_PATH, ApplicationConstants.USER_GUIDE_FILE_NAME));

            byte[] bytes = System.IO.File.ReadAllBytes(fullPath);

            return File(bytes, ApplicationConstants.PDF_CONTENT_TYPE, ApplicationConstants.USER_GUIDE_FILE_NAME);
        }
    }
}
