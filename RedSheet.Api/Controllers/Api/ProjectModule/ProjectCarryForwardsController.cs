using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using Rx.Core.Security;

namespace RedSheet.Api.Controllers
{
    [Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class ProjectCarryForwardsController : BaseController
    {
        public ProjectCarryForwardsController(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility, IProjectUow projectUow, IRecentActivityAndNotificationUow recentActivityAndNotificationUow)
        {
            Uow.ProjectModule = projectModuleUow;
            ApplicationUtility = applicationUtility;
            Uow.Project = projectUow;
            Uow.RecentActivityAndNotification = recentActivityAndNotificationUow;
        }

        [HttpGet]
        public IActionResult Get(int projectModuleId) => Ok(Uow.ProjectModule.Repository<vProjectCarryForward>().FindBy(t => t.ProjectModuleId == projectModuleId));


        [HttpGet("{id}")]
        public IActionResult Get(int projectModuleId, int id) => Ok(Uow.ProjectModule.Repository<vProjectCarryForwardRecord>().SingleOrDefault(t => t.ProjectCarryForwardId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectCarryForward projectCarryForward)
        {
            Uow.ProjectModule.RegisterNew<ProjectCarryForward>(projectCarryForward);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectCarryForward.ProjectModuleId);
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
                ProjectModuleId = projectCarryForward.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == (Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == projectCarryForward.ProjectModuleId).ProjectId)).OwnerId;
            var count = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == projectCarryForward.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(projectCarryForward.ProjectModuleId);
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
                    ProjectModuleId = projectCarryForward.ProjectModuleId,
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
                var notificationUpdate = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == projectCarryForward.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                Uow.RecentActivityAndNotification.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                Uow.RecentActivityAndNotification.Commit();
            }
            return Ok(projectCarryForward);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectCarryForward projectCarryForward)
        {
            Uow.ProjectModule.RegisterDirty<ProjectCarryForward>(projectCarryForward);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectCarryForward.ProjectModuleId);
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
                ProjectModuleId = projectCarryForward.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = Uow.Project.Repository<Project>().FirstOrDefault(t => t.ProjectId == (Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == projectCarryForward.ProjectModuleId).ProjectId)).OwnerId;
            var count = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == projectCarryForward.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(projectCarryForward.ProjectModuleId);
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
                    ProjectModuleId = projectCarryForward.ProjectModuleId,
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
                var notificationUpdate = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == projectCarryForward.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
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
            var projectCarryForward = Uow.ProjectModule.Repository<ProjectCarryForward>().FindByKey(id);
            Uow.ProjectModule.RegisterDeleted<ProjectCarryForward>(projectCarryForward);
            Uow.ProjectModule.Commit();
            return NoContent();
        }
    }
}