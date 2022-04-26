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
    public class ProjectModuleReviewsController : BaseController
    {
        public ProjectModuleReviewsController(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectModule = projectModuleUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectModuleId) => Ok(Uow.ProjectModule.Repository<ProjectModuleReview>().FindBy(t=> t.ProjectModuleId == projectModuleId));


        [HttpGet("{id}")]
        //public IActionResult  Get(int projectModuleId, int id)  => Ok(Uow.ProjectModule.Repository<vProjectModuleReviewRecord>().SingleOrDefault(t => t.ProjectModuleReviewId == id));
        public IActionResult Get(int projectModuleId, int id) => Ok(Uow.ProjectModule.Repository<vProjectModuleReviewRecord>().FirstOrDefault(t => t.ProjectModuleId == projectModuleId));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectModuleReview projectModuleReview)
        {
            Uow.ProjectModule.RegisterNew<ProjectModuleReview>(projectModuleReview);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectModuleReview.ProjectModuleId);

            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>Review is filled in " + moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (Uow.ProjectModule.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName)+"</span>";
            }
            else
            {
                RecentActivityAndNotificationName = "Review is filled in " + moduleData.TemplateModuleName + " Of " + (Uow.ProjectModule.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName);
            }

            RecentActivityAndNotification recentActivityAndNotification = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = projectModuleReview.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivityAndNotification);
            return Ok(projectModuleReview);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectModuleReview projectModuleReview)
        {
            Uow.ProjectModule.RegisterDirty<ProjectModuleReview>(projectModuleReview);
            Uow.ProjectModule.Commit();
            var moduleData = Uow.ProjectModule.Repository<ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectModuleReview.ProjectModuleId);
            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>Review is updated in " + moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (Uow.ProjectModule.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName)+"</span>";
            }
            else
            {
                RecentActivityAndNotificationName = "Review is updated in " + moduleData.TemplateModuleName + " Of " + (Uow.ProjectModule.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " by " + (Uow.ProjectModule.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName);
            }
            RecentActivityAndNotification recentActivityAndNotification = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = projectModuleReview.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivityAndNotification);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var projectModuleReview = Uow.ProjectModule.Repository<ProjectModuleReview>().FindByKey(id);
            Uow.ProjectModule.RegisterDeleted<ProjectModuleReview>(projectModuleReview);
            Uow.ProjectModule.Commit();
            return NoContent();
        }
    }
}