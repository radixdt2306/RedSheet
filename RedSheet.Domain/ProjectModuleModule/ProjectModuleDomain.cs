using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System;
using System.Linq;
using Rx.Core.Security;
using Rx.Core.Settings;
using Rx.Core.Data;
using RedSheet.BoundedContext.SqlContext;
using System.Data.SqlClient;
using RedSheet.ViewModels.Models;
using System.Threading.Tasks;

namespace RedSheet.Domain.ProjectModuleModule
{
    public class ProjectModuleDomain : IProjectModuleDomain
    {
        public ProjectModuleDomain(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility, IProjectUow projectUow, IScheduleEmailUow scheduleEmailUow, ServerSetting serverSetting, IDbContextManager<MainSqlDbContext> dbContextManager, IRecentActivityAndNotificationUow recentActivityAndNotificationUow)
        {
            ProjectModuleUow = projectModuleUow;
            ProjectUow = projectUow;
            ScheduleEmailUow = scheduleEmailUow;
            ServerSetting = serverSetting;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
            DbContextManager = dbContextManager;
            RecentActivityAndNotificationUow = recentActivityAndNotificationUow;
        }

        public IEnumerable<RedSheet.DbEntities.Models.ProjectModule> Get() => ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().All();

        public vProjectModuleRecord Get(int id) => ProjectModuleUow.Repository<vProjectModuleRecord>().SingleOrDefault(t => t.ProjectModuleId == id);

        public HashSet<string> AddValidation(RedSheet.DbEntities.Models.ProjectModule projectModule)
        {
            CommonValidation(projectModule);
            return ValidationMessages;
        }

        public RedSheet.DbEntities.Models.ProjectModule Add(RedSheet.DbEntities.Models.ProjectModule projectModule)
        {
            ProjectModuleUow.RegisterNew<RedSheet.DbEntities.Models.ProjectModule>(projectModule);
            ProjectModuleUow.Commit();
            return projectModule;
        }
        public HashSet<string> UpdateValidation(RedSheet.DbEntities.Models.ProjectModule projectModule)
        {
            CommonValidation(projectModule);
            return ValidationMessages;
        }

        public RedSheet.DbEntities.Models.ProjectModule Update(RedSheet.DbEntities.Models.ProjectModule projectModule)
        {
            var reviewer = new List<ProjectModuleReviewer>();
            var assignee = new List<ProjectModuleAssignee>();
            var projectModuleData = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == projectModule.ProjectModuleId);
            if (projectModule.ProjectModuleAssignees.Count > 0)
            {
                foreach (var projectModuleAssignee in projectModule.ProjectModuleAssignees)
                {
                    if (Convert.ToBoolean(projectModuleAssignee.IsChecked))
                    {
                        if (projectModuleAssignee.ProjectModuleAssigneeId == 0)
                        {
                            ProjectModuleUow.RegisterNew<ProjectModuleAssignee>(projectModuleAssignee);
                            var Url = GetUrl(projectModuleAssignee.ProjectModuleId);
                            if (!projectModuleData.Status)
                            {
                                string RecentActivityAndNotificationName = string.Empty;
                                if (projectModuleData.TemplateModuleId == 41 || projectModuleData.TemplateModuleId == 45 || projectModuleData.TemplateModuleId == 46)
                                {
                                    RecentActivityAndNotificationName = "<span>You can fill data in " + projectModuleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == projectModuleData.ProjectId).ProjectName)+"</span>";
                                }
                                else
                                {
                                    RecentActivityAndNotificationName = "You can fill data in " + projectModuleData.TemplateModuleName + " of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == projectModuleData.ProjectId).ProjectName);
                                }
                                RecentActivityAndNotification recentNotification = new RecentActivityAndNotification()
                                {
                                    IsSeen = false,
                                    IsNotification = true,
                                    ProjectId = projectModuleData.ProjectId,
                                    RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                                    URL = Url,
                                    ProjectModuleId = projectModuleData.ProjectModuleId,
                                    UserId = projectModuleAssignee.UserId,
                                    UpdatedBy = UserClaim.UserId,
                                    UpdatedOn = DateTime.Now,
                                    TemplateModuleId = projectModuleData.TemplateModuleId,
                                    TemplateModuleName = projectModuleData.TemplateModuleName,
                                    NotificationStatus = false
                                };
                                ApplicationUtility.RecentActivityPost(recentNotification);
                            }
                        }
                        else
                        {
                            ProjectModuleUow.RegisterDirty<ProjectModuleAssignee>(projectModuleAssignee);
                        }
                    }
                    else
                    {
                        if (projectModuleAssignee.ProjectModuleAssigneeId != 0)
                            ProjectModuleUow.RegisterDeleted<ProjectModuleAssignee>(projectModuleAssignee);

                    }
                    //var notificationData = ProjectModuleUow.Repository<RecentActivityAndNotification>().FirstOrDefault(t => t.ProjectModuleId == projectModuleAssignee.ProjectModuleId && t.UserId == projectModuleAssignee.UserId);
                    //if (notificationData != null)
                    //{
                    //    notificationData.IsSeen = true;
                    //    RecentActivityAndNotificationUow.RegisterDirty<RecentActivityAndNotification>(notificationData);
                    //    RecentActivityAndNotificationUow.Commit();
                    //}
                }
                var UserName = ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName;
                string CollaboratorName = string.Empty;
                if (projectModuleData.TemplateModuleId == 41 || projectModuleData.TemplateModuleId == 45 || projectModuleData.TemplateModuleId == 46)
                {
                    CollaboratorName = "<span>Collaborators are updated in " + projectModuleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == projectModuleData.ProjectId).ProjectName) + " by " + UserName + "</span>";
                }
                else
                {
                    CollaboratorName = "Collaborators are updated in " + projectModuleData.TemplateModuleName + " of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == projectModuleData.ProjectId).ProjectName) + " by " + UserName;
                }
                RecentActivityAndNotification recentActivityAndNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    IsNotification = false,
                    ProjectId = projectModuleData.ProjectId,
                    RecentActivityAndNotificationName = CollaboratorName,
                    URL = "",
                    ProjectModuleId = projectModuleData.ProjectModuleId,
                    UserId = UserClaim.UserId,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = projectModuleData.TemplateModuleId,
                    TemplateModuleName = projectModuleData.TemplateModuleName,
                    NotificationStatus = null
                };
                ApplicationUtility.RecentActivityPost(recentActivityAndNotification);
            }
            if (projectModule.ProjectModuleReviewers.Count > 0)
            {
                foreach (var projectModuleReviewers in projectModule.ProjectModuleReviewers)
                {
                    if (Convert.ToBoolean(projectModuleReviewers.IsChecked))
                    {
                        if (projectModuleReviewers.ProjectModuleReviewerId == 0)
                        {
                            ProjectModuleUow.RegisterNew<ProjectModuleReviewer>(projectModuleReviewers);
                        }
                        else
                        {
                            ProjectModuleUow.RegisterDirty<ProjectModuleReviewer>(projectModuleReviewers);
                        }
                    }
                    else
                    {
                        if (projectModuleReviewers.ProjectModuleReviewerId != 0)
                            ProjectModuleUow.RegisterDeleted<ProjectModuleReviewer>(projectModuleReviewers);
                    }
                }
                var UserName = ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName;

                string RecentActivityAndNotificationName = string.Empty;
                if (projectModuleData.TemplateModuleId == 41 || projectModuleData.TemplateModuleId == 45 || projectModuleData.TemplateModuleId == 46)
                {
                    RecentActivityAndNotificationName = "<span>Reviewers are updated in " + projectModuleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == projectModuleData.ProjectId).ProjectName) + " by " + UserName + "</span>";
                }
                else
                {
                    RecentActivityAndNotificationName = "Reviewers are updated in " + projectModuleData.TemplateModuleName + " of " + (ProjectModuleUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == projectModuleData.ProjectId).ProjectName) + " by " + UserName;
                }
                RecentActivityAndNotification recentActivityAndNotification = new RecentActivityAndNotification()
                {
                    IsSeen = false,
                    IsNotification = false,
                    ProjectId = projectModuleData.ProjectId,
                    RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                    URL = "",
                    ProjectModuleId = projectModuleData.ProjectModuleId,
                    UserId = UserClaim.UserId,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = projectModuleData.TemplateModuleId,
                    TemplateModuleName = projectModuleData.TemplateModuleName,
                    NotificationStatus = null
                };
                ApplicationUtility.RecentActivityPost(recentActivityAndNotification);
            }
            if (projectModule.Status)
            {
                Project project = ProjectUow.Repository<Project>().SingleOrDefault(a => a.ProjectId == projectModule.ProjectId);
                string EmailTemplateName = ServerSetting.Get<string>("emailSettings.NewModuleAvailableForReview");
                ApplicationUtility.scheduleEmailPost(UserClaim.UserId, project, 0, EmailTemplateName);
            }
            projectModule.ProjectModuleAssignees = assignee;
            projectModule.ProjectModuleReviewers = reviewer;
            projectModule.UpdatedBy = UserClaim.UserId;
            projectModule.UpdatedOn = DateTime.Now;
            ProjectModuleUow.RegisterDirty<RedSheet.DbEntities.Models.ProjectModule>(projectModule);
            ProjectModuleUow.Commit();
            //var projectModuleData = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == projectModule.ProjectModuleId);

            return projectModule;
        }

        public string GetUrl(int projectModuleId)
        {
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = projectModuleId };
            spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
            var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetUrl @ProjectModuleId, @UserId", spParameters).Result;
            return storeProcSearchResult.SingleOrDefault()?.Result;
        }

        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<RedSheet.DbEntities.Models.ProjectModule>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var projectModule = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindByKey(id);
            ProjectModuleUow.RegisterDeleted<RedSheet.DbEntities.Models.ProjectModule>(projectModule);
            ProjectModuleUow.Commit();
        }

        private void CommonValidation(RedSheet.DbEntities.Models.ProjectModule projectModule)
        {

        }
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        private IProjectModuleUow ProjectModuleUow { get; set; }

        private IProjectUow ProjectUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private ServerSetting ServerSetting { get; set; }

        private IScheduleEmailUow ScheduleEmailUow { get; set; }
        private IRecentActivityAndNotificationUow RecentActivityAndNotificationUow { get; set; }

    }
    public interface IProjectModuleDomain
    {
        IEnumerable<RedSheet.DbEntities.Models.ProjectModule> Get();
        vProjectModuleRecord Get(int id);
        HashSet<string> AddValidation(RedSheet.DbEntities.Models.ProjectModule projectModule);
        HashSet<string> UpdateValidation(RedSheet.DbEntities.Models.ProjectModule projectModule);
        HashSet<string> DeleteValidation(int id);
        RedSheet.DbEntities.Models.ProjectModule Add(RedSheet.DbEntities.Models.ProjectModule projectModule);
        RedSheet.DbEntities.Models.ProjectModule Update(RedSheet.DbEntities.Models.ProjectModule projectModule);
        string GetUrl(int projectModuleId);
        void Delete(int id);
    }
}
