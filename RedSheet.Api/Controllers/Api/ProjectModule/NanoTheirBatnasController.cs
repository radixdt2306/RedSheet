using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Filters;
using Rx.Core.Security;
using Rx.Core.Data;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.ViewModels.Models;
using System.Data.SqlClient;
namespace RedSheet.Api.Controllers
{

    [Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class NanoTheirBatnasController : BaseController
    {
        public IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public NanoTheirBatnasController(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility, IProjectUow projectUow, IDbContextManager <MainSqlDbContext> mainDbContextManager, IRecentActivityAndNotificationUow recentActivityAndNotificationUow, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            Uow.ProjectModule = projectModuleUow;
            ApplicationUtility = applicationUtility;
            Uow.Project = projectUow;
            Uow.RecentActivityAndNotification = recentActivityAndNotificationUow;
            this.DbContextManager = dbContextManager;
        }

        [HttpGet]
        public IActionResult Get(int projectModuleId) => Ok(Uow.ProjectModule.Repository<vNanoTheirBatna>().FindBy(t => t.ProjectModuleId == projectModuleId));


        [HttpGet("{id}")]
        public IActionResult Get(int projectModuleId, int id) => Ok(Uow.ProjectModule.Repository<vNanoTheirBatnaRecord>().SingleOrDefault(t => t.NanoTheirBatnaId == id));
        
        [HttpPost]
        public IActionResult Post([FromBody]NanoTheirBatna nanoTheirBatna)
        {
            Uow.ProjectModule.RegisterNew<NanoTheirBatna>(nanoTheirBatna);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == nanoTheirBatna.ProjectModuleId);

            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>"+moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is filled by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName)+"</span>";
            }
            else
            {
                RecentActivityAndNotificationName = moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is filled by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName);
            }
            RecentActivityAndNotification recentActivity = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = nanoTheirBatna.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == (Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == nanoTheirBatna.ProjectModuleId).ProjectId)).OwnerId;
            var count = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == nanoTheirBatna.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(nanoTheirBatna.ProjectModuleId);

            if (count <= 0)
            {
                string CheckLock = string.Empty;
                if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
                {
                    CheckLock = "<span>You can check and lock " + moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName)+"</span>";
                }
                else
                {
                    CheckLock = "You can check and lock " + moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName);
                }
                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    NotificationStatus = false,
                    IsNotification = true,
                    ProjectId = moduleData.ProjectId,
                    ProjectModuleId = nanoTheirBatna.ProjectModuleId,
                    RecentActivityAndNotificationName = CheckLock,
                    TemplateModuleId = moduleData.TemplateModuleId,
                    TemplateModuleName = moduleData.TemplateModuleName,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    URL = Url,
                    UserId = ownerId,
                };
                ApplicationUtility.RecentActivityPost(recentNotification);
            }
            else
            {
                var notificationUpdate = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == nanoTheirBatna.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                Uow.RecentActivityAndNotification.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                Uow.RecentActivityAndNotification.Commit();
            }
            return Ok(nanoTheirBatna);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]NanoTheirBatna nanoTheirBatna)
        {
            Uow.ProjectModule.RegisterDirty<NanoTheirBatna>(nanoTheirBatna);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == nanoTheirBatna.ProjectModuleId);
            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>"+moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is updated by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName)+"</span>";
            }
            else
            {
                RecentActivityAndNotificationName = moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is updated by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName);
            }
            RecentActivityAndNotification recentActivity = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = nanoTheirBatna.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == (Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == nanoTheirBatna.ProjectModuleId).ProjectId)).OwnerId;
            var count = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == nanoTheirBatna.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(nanoTheirBatna.ProjectModuleId);
            if (count <= 0)
            {
                string CheckLock = string.Empty;
                if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
                {
                    CheckLock = "<span>You can check and lock " + moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName)+"</span>";
                }
                else
                {
                    CheckLock = "You can check and lock " + moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName);
                }
                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    NotificationStatus = false,
                    IsNotification = true,
                    ProjectId = moduleData.ProjectId,
                    ProjectModuleId = nanoTheirBatna.ProjectModuleId,
                    RecentActivityAndNotificationName = CheckLock,
                    TemplateModuleId = moduleData.TemplateModuleId,
                    TemplateModuleName = moduleData.TemplateModuleName,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    URL = Url,
                    UserId = ownerId,
                };
                ApplicationUtility.RecentActivityPost(recentNotification);
            }
            else
            {
                var notificationUpdate = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == nanoTheirBatna.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                Uow.RecentActivityAndNotification.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                Uow.RecentActivityAndNotification.Commit();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var nanoTheirBatna = Uow.ProjectModule.Repository<NanoTheirBatna>().FindByKey(id);
            Uow.ProjectModule.RegisterDeleted<NanoTheirBatna>(nanoTheirBatna);
            Uow.ProjectModule.Commit();
            return NoContent();
        }
    }
}