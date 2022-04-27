using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using Rx.Core.Security;
using System;

namespace RedSheet.Domain.ProjectModuleModule
{
    public class ProjectImplementationPlanDomain : IProjectImplementationPlanDomain
    {
        public ProjectImplementationPlanDomain(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility, IProjectUow projectUow, IRecentActivityAndNotificationUow recentActivityAndNotificationUow)
        {
            ProjectModuleUow = projectModuleUow;
            ProjectUow = projectUow;
            RecentActivityAndNotificationUow = recentActivityAndNotificationUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }

        public IEnumerable<vProjectImplementationPlan> Get(int projectModuleId) => ProjectModuleUow.Repository<vProjectImplementationPlan>().FindBy(t => t.ProjectModuleId == projectModuleId);

        public vProjectImplementationPlanRecord Get(int projectModuleId, int id) => ProjectModuleUow.Repository<vProjectImplementationPlanRecord>().SingleOrDefault(t => t.ProjectImplementationPlanId == id);

        public HashSet<string> AddValidation(ProjectImplementationPlan projectImplementationPlan)
        {
            var implementationPlanName = ProjectModuleUow.Repository<ProjectImplementationPlan>().SingleOrDefault(t => t.Name == projectImplementationPlan.Name && t.ProjectModuleId == projectImplementationPlan.ProjectModuleId && t.IsEvent == projectImplementationPlan.IsEvent);
            if (implementationPlanName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(projectImplementationPlan);
            return ValidationMessages;
        }

        public ProjectImplementationPlan Add(ProjectImplementationPlan projectImplementationPlan)
        {
            ProjectModuleUow.RegisterNew<ProjectImplementationPlan>(projectImplementationPlan);
            ProjectModuleUow.Commit();
            var moduleData = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectImplementationPlan.ProjectModuleId);

            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>"+moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is filled by " + (ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName)+"</span>";
            }
            else
            {
                RecentActivityAndNotificationName = moduleData.TemplateModuleName + " Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is filled by " + (ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName);
            }
            RecentActivityAndNotification recentActivity = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = projectImplementationPlan.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == (ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == projectImplementationPlan.ProjectModuleId).ProjectId)).OwnerId;
            var count = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == projectImplementationPlan.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(projectImplementationPlan.ProjectModuleId);
            if (count <= 0)
            {
                string CheckLock = string.Empty;
                if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
                {
                    CheckLock = "<span>You can check and lock " + moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName)+"</span>";
                }
                else
                {
                    CheckLock = "You can check and lock " + moduleData.TemplateModuleName + " Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName);
                }
                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    NotificationStatus = false,
                    IsNotification = true,
                    ProjectId = moduleData.ProjectId,
                    ProjectModuleId = projectImplementationPlan.ProjectModuleId,
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
                var notificationUpdate = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == projectImplementationPlan.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                RecentActivityAndNotificationUow.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                RecentActivityAndNotificationUow.Commit();
            }
            return projectImplementationPlan;
        }
        public HashSet<string> UpdateValidation(ProjectImplementationPlan projectImplementationPlan)
        {
            var implementationPlanName = ProjectModuleUow.Repository<ProjectImplementationPlan>().SingleOrDefault(t => t.Name == projectImplementationPlan.Name && t.ProjectModuleId == projectImplementationPlan.ProjectModuleId && t.ProjectImplementationPlanId != projectImplementationPlan.ProjectImplementationPlanId && t.IsEvent == projectImplementationPlan.IsEvent);
            if (implementationPlanName != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(projectImplementationPlan);
            return ValidationMessages;
        }

        public ProjectImplementationPlan Update(ProjectImplementationPlan projectImplementationPlan)
        {
            ProjectModuleUow.RegisterDirty<ProjectImplementationPlan>(projectImplementationPlan);
            ProjectModuleUow.Commit();
            var moduleData = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == projectImplementationPlan.ProjectModuleId);
            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>"+moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is updated by " + (ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName)+"</span>";
            }
            else
            {
                RecentActivityAndNotificationName = moduleData.TemplateModuleName + " Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is updated by " + (ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName);
            }
            RecentActivityAndNotification recentActivity = new RecentActivityAndNotification()
            {
                IsSeen = false,
                NotificationStatus = false,
                IsNotification = false,
                ProjectId = moduleData.ProjectId,
                ProjectModuleId = projectImplementationPlan.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);

            var ownerId = ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == (ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == projectImplementationPlan.ProjectModuleId).ProjectId)).OwnerId;
            var count = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == projectImplementationPlan.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(projectImplementationPlan.ProjectModuleId);
            if (count <= 0)
            {
                string CheckLock = string.Empty;
                if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
                {
                    CheckLock = "<span>You can check and lock " + moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName)+"</span>";
                }
                else
                {
                    CheckLock = "You can check and lock " + moduleData.TemplateModuleName + " Of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName);
                }
                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    NotificationStatus = false,
                    IsNotification = true,
                    ProjectId = moduleData.ProjectId,
                    ProjectModuleId = projectImplementationPlan.ProjectModuleId,
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
                var notificationUpdate = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == projectImplementationPlan.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                RecentActivityAndNotificationUow.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                RecentActivityAndNotificationUow.Commit();
            }
            return projectImplementationPlan;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<ProjectImplementationPlan>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectImplementationPlan = ProjectModuleUow.Repository<ProjectImplementationPlan>().FindByKey(id);
            ProjectModuleUow.RegisterDeleted<ProjectImplementationPlan>(projectImplementationPlan);
            ProjectModuleUow.Commit();
        }

        private void CommonValidation(ProjectImplementationPlan projectImplementationPlan)
        {

        }
        private IProjectUow ProjectUow { get; set; }

        private IRecentActivityAndNotificationUow RecentActivityAndNotificationUow { get; set; }

        private IProjectModuleUow ProjectModuleUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

    }
    public interface IProjectImplementationPlanDomain
    {
        IEnumerable<vProjectImplementationPlan> Get(int projectModuleId);
        vProjectImplementationPlanRecord Get(int projectModuleId, int id);
        HashSet<string> AddValidation(ProjectImplementationPlan projectImplementationPlan);
        HashSet<string> UpdateValidation(ProjectImplementationPlan projectImplementationPlan);
        HashSet<string> DeleteValidation(int id);
        ProjectImplementationPlan Add(ProjectImplementationPlan projectImplementationPlan);
        ProjectImplementationPlan Update(ProjectImplementationPlan projectImplementationPlan);
        void Delete(int id);
    }
}
