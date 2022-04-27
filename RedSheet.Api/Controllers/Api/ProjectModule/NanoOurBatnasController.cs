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

namespace RedSheet.Api.Controllers
{

    [Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class NanoOurBatnasController : BaseController
    {
        public NanoOurBatnasController(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility, IProjectUow projectUow, IRecentActivityAndNotificationUow recentActivityAndNotificationUow)
        {
            Uow.ProjectModule = projectModuleUow;
            ApplicationUtility = applicationUtility;
            Uow.Project = projectUow;
            Uow.RecentActivityAndNotification = recentActivityAndNotificationUow;
        }

        [HttpGet]
        public IActionResult Get(int projectModuleId) => Ok(Uow.ProjectModule.Repository<vNanoOurBatna>().FindBy(t => t.ProjectModuleId == projectModuleId));


        [HttpGet("{id}")]
        public IActionResult Get(int projectModuleId, int id) => Ok(Uow.ProjectModule.Repository<vNanoOurBatnaRecord>().SingleOrDefault(t => t.NanoOurBatnaId == id));

        [HttpPost]
        public IActionResult Post([FromBody]NanoOurBatna nanoOurBatna)
        {
            Uow.ProjectModule.RegisterNew<NanoOurBatna>(nanoOurBatna);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == nanoOurBatna.ProjectModuleId);
            RecentActivityAndNotification recentActivity = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = nanoOurBatna.ProjectModuleId,
                RecentActivityAndNotificationName = moduleData.TemplateModuleName + " Of " + (Uow.ProjectModule.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is filled by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName),
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == (Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == nanoOurBatna.ProjectModuleId).ProjectId)).OwnerId;
            var count = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == nanoOurBatna.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(nanoOurBatna.ProjectModuleId);
            if (count <= 0)
            {
                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    NotificationStatus = false,
                    IsNotification = true,
                    ProjectId = moduleData.ProjectId,
                    ProjectModuleId = nanoOurBatna.ProjectModuleId,
                    RecentActivityAndNotificationName = "You can check and lock " + moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName),
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
                var notificationUpdate = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == nanoOurBatna.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                Uow.RecentActivityAndNotification.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                Uow.RecentActivityAndNotification.Commit();
            }
            return Ok(nanoOurBatna);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]NanoOurBatna nanoOurBatna)
        {
            Uow.ProjectModule.RegisterDirty<NanoOurBatna>(nanoOurBatna);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == nanoOurBatna.ProjectModuleId);
            RecentActivityAndNotification recentActivity = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = nanoOurBatna.ProjectModuleId,
                RecentActivityAndNotificationName = moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is updated by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName),
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == (Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == nanoOurBatna.ProjectModuleId).ProjectId)).OwnerId;
            var count = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == nanoOurBatna.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(nanoOurBatna.ProjectModuleId);
            if (count <= 0)
            {
                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    NotificationStatus = false,
                    IsNotification = true,
                    ProjectId = moduleData.ProjectId,
                    ProjectModuleId = nanoOurBatna.ProjectModuleId,
                    RecentActivityAndNotificationName = "You can check and lock " + moduleData.TemplateModuleName + " Of " + (Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName),
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
                var notificationUpdate = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == nanoOurBatna.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
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
            var nanoOurBatna = Uow.ProjectModule.Repository<NanoOurBatna>().FindByKey(id);
            Uow.ProjectModule.RegisterDeleted<NanoOurBatna>(nanoOurBatna);
            Uow.ProjectModule.Commit();
            return NoContent();
        }
    }
}