using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using Rx.Core.Security;
using System;
using RedSheet.Domain.Users;
using Rx.Core.Settings;
using Rx.Core.Data;
using RedSheet.BoundedContext.SqlContext;
using System.Data.SqlClient;
using System.Linq;
using RedSheet.ViewModels.Models;
using System.IO;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Http;
using RedSheet.Models.ViewModels;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using WebSupergoo.ABCpdf11;
using WebSupergoo.ABCpdf11.Objects;
using System.Net.Mail;
using System.Configuration;
using RedSheet.Domain.ExportReportModule;
using RedSheet.DbEntities.ViewModels;

namespace RedSheet.Domain.ProjectModule
{
    public class ProjectDomain : IProjectDomain
    {
        private ServerSetting ServerSetting { get; set; }
        //private HtmlToPdfConverter HtmlToPdfConverter { get; set; }

        public ProjectDomain(IProjectUow projectUow, IApplicationUtility applicationUtility, IProjectModuleUow projectModuleUow, IUserUow userUow, IScheduleEmailUow scheduleEmailUow, ServerSetting serverSetting, IDbContextManager<MainSqlDbContext> dbContextManager, IExportReportPDFDomain exportReportPDFDomain
            , ILiteMeetingManagementUow liteMeetingManagementUow, ILiteProjectBackgroundUow liteProjectBackgroundUow, INanoScopeToNegotiateObjectiveUow nanoScopeToNegotiateObjectiveUow, IProjectBackgroundUow projectBackgroundUow, IProjectCultureUow projectCultureUow, IProjectEventTimelineUow projectEventTimelineUow
            , IProjectGameUow projectGameUow, IProjectNegotiationUow projectNegotiationUow, IProjectNegotionalityUow projectNegotionalityUow, IProjectLearningUow projectLearningUow, IProjectPowerUow projectPowerUow, IProjectPreparationUow projectPreparationUow, IProjectRequirementUow projectRequirementUow,
            IProjectStakeholderUow projectStakeholderUow, IExportReportUow exportReportUow, IProjectCulturePlanUow projectCulturePlanUow)
        {
            ProjectUow = projectUow;
            UserUow = userUow;
            ScheduleEmailUow = scheduleEmailUow;
            ProjectModuleUow = projectModuleUow;
            ApplicationUtility = applicationUtility;
            ServerSetting = serverSetting;
            ValidationMessages = new HashSet<string>();
            DbContextManager = dbContextManager;
            ExportReportPDFDomain = exportReportPDFDomain;
            LiteMeetingManagementUow = liteMeetingManagementUow;
            LiteProjectBackgroundUow = liteProjectBackgroundUow;
            NanoScopeToNegotiateObjectiveUow = nanoScopeToNegotiateObjectiveUow;
            ProjectBackgroundUow = projectBackgroundUow;
            ProjectCultureUow = projectCultureUow;
            ProjectEventTimelineUow = projectEventTimelineUow;
            ProjectGameUow = projectGameUow;
            ProjectNegotiationUow = projectNegotiationUow;
            ProjectNegotionalityUow = projectNegotionalityUow;
            ProjectLearningUow = projectLearningUow;
            ProjectPowerUow = projectPowerUow;
            ProjectPreparationUow = projectPreparationUow;
            ProjectRequirementUow = projectRequirementUow;
            ProjectStakeholderUow = projectStakeholderUow;
            ExportReportUow = exportReportUow;
            ProjectCulturePlanUow = projectCulturePlanUow;
          
        }

        public HashSet<string> AddValidation(Project project)
        {


            CommonValidation(project);
            var projectObject = ProjectUow.Repository<Project>().SingleOrDefault(t => t.ProjectName == project.ProjectName);
            if (projectObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public Project Add(Project project, int templateTypeId)
        {
            project.OwnerId = UserClaim.UserId;
            project.CreatedBy = UserClaim.UserId;
            project.CreatedOn = DateTime.Now;
            project.UpdatedBy = UserClaim.UserId;
            project.UpdatedOn = DateTime.Now;
            ProjectUow.RegisterNew<Project>(project);
            ProjectUow.Commit();
            int[] userEmailuserIds = new int[100];
            int k = 0;
            string EmailTemplateName = ServerSetting.Get<string>("emailSettings.ProjectAssignmentOfUsers");
            foreach (RedSheet.DbEntities.Models.ProjectModule projectModule in project.ProjectModules)
            {
                foreach (ProjectModuleAssignee projectModuleAssignee in projectModule.ProjectModuleAssignees)
                {
                    int t = Array.IndexOf(userEmailuserIds, projectModuleAssignee.UserId);
                    if (t <= -1)
                    {
                        userEmailuserIds[k] = projectModuleAssignee.UserId;
                        ApplicationUtility.scheduleEmailPost(projectModuleAssignee.UserId, project, project.NoOfDays, EmailTemplateName);
                        k++;
                    }
                }
                foreach (ProjectModuleReviewer projectModuleReviewer in projectModule.ProjectModuleReviewers)
                {
                    int t = Array.IndexOf(userEmailuserIds, projectModuleReviewer.UserId);
                    if (t <= -1)
                    {
                        userEmailuserIds[k] = projectModuleReviewer.UserId;
                        ApplicationUtility.scheduleEmailPost(projectModuleReviewer.UserId, project, project.NoOfDays, EmailTemplateName);
                        k++;
                    }
                }

            }
            ScheduleEmailUow.Commit();
            AddRecentActivityAndNotification(project, templateTypeId);

            return project;
        }

        private void AddRecentActivityAndNotification(Project project, int templateTypeId, bool isCreatedCopy = false)
        {
            string EmailTemplateName = ServerSetting.Get<string>("emailSettings.ModuleInactivityEmail");
            var ownerData = ProjectUow.Repository<User>().SingleOrDefault(b => b.UserId == UserClaim.UserId);
            //var backgroundModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.Background);
            var backgroundModule = new DbEntities.Models.ProjectModule();

            if (templateTypeId == 1)
            {
                backgroundModule = ProjectUow.Repository<DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.Background);
            }
            else if (templateTypeId == 2)
            {
                backgroundModule = ProjectUow.Repository<DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.BackgroundToTheNegotiation);
            }
            else if (templateTypeId == 3)
            {
                backgroundModule = ProjectUow.Repository<DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.ScopetoNegotiateandObjectives);
            }

            var backgroundAssignee = ProjectUow.Repository<ProjectModuleAssignee>().FindBy(x => x.ProjectModuleId == backgroundModule.ProjectModuleId);
            var Url = GetUrl(backgroundModule.ProjectModuleId);

            var recentActivity = new RecentActivityAndNotification()
            {
                RecentActivityAndNotificationName = string.Concat(project.ProjectName, isCreatedCopy ? " is created as copy by " : " is created by ", ownerData.FirstName),
                URL = "",
                IsNotification = false,
                ProjectModuleId = backgroundModule.ProjectModuleId,
                ProjectId = project.ProjectId,
                UserId = UserClaim.UserId,
                IsSeen = false,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                TemplateModuleId = backgroundModule.TemplateModuleId,
                TemplateModuleName = backgroundModule.TemplateModuleName,
                NotificationStatus = null
            };

            ProjectUow.RegisterNew<RecentActivityAndNotification>(recentActivity);

            foreach (var data in backgroundAssignee)
            {
                //ApplicationUtility.scheduleEmailPost(data.UserId, project, project.NoOfDays, EmailTemplateName);
                ScheduleEmail scheduleEmail = new ScheduleEmail();
                scheduleEmail.EmailTemplateName = EmailTemplateName;
                scheduleEmail.EmailTo = UserUow.Repository<User>().SingleOrDefault(t => t.UserId == data.UserId && t.StatusId != Status.Deleted).Email;
                scheduleEmail.EmailFrom = ServerSetting.Get<string>("emailSettings.fromAddress");
                scheduleEmail.InactivityDays = project.NoOfDays;
                scheduleEmail.IsSentScheduleEmail = false;
                scheduleEmail.ProjectName = project.ProjectName;
                scheduleEmail.RequestedDateTime = DateTime.Now;
                scheduleEmail.ProjectId = project.ProjectId;
                scheduleEmail.ProjectModuleId = backgroundModule.ProjectModuleId;

                ScheduleEmailUow.RegisterNew<ScheduleEmail>(scheduleEmail);

                string RecentActivityAndNotificationName = string.Empty;

                if (backgroundModule.TemplateModuleId == 41 || backgroundModule.TemplateModuleId == 45 || backgroundModule.TemplateModuleId == 46)
                {
                    RecentActivityAndNotificationName = "<span>You can fill data in " + backgroundModule.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i>  Of " + project.ProjectName + "</span>";
                }
                else
                {
                    RecentActivityAndNotificationName = "You can fill data in " + backgroundModule.TemplateModuleName + " Of " + project.ProjectName;
                }

                var recentNotification = new RecentActivityAndNotification()
                {
                    RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                    URL = Url,
                    IsNotification = true,
                    ProjectModuleId = backgroundModule.ProjectModuleId,
                    ProjectId = project.ProjectId,
                    UserId = data.UserId,
                    IsSeen = false,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = backgroundModule.TemplateModuleId,
                    TemplateModuleName = backgroundModule.TemplateModuleName,
                    NotificationStatus = false
                };

                ProjectUow.RegisterNew<RecentActivityAndNotification>(recentNotification);
            }

            ProjectUow.Commit();
            ScheduleEmailUow.Commit();
        }

        public HashSet<string> UpdateValidation(Project project)
        {
            CommonValidation(project);
            var projectObject = ProjectUow.Repository<Project>().SingleOrDefault(t => t.ProjectName == project.ProjectName && t.ProjectId != project.ProjectId);
            if (projectObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public Project Update(Project project, int templateTypeId)
        {
            project.UpdatedBy = UserClaim.UserId;
            project.UpdatedOn = DateTime.Now;
            ProjectUow.RegisterDirty<Project>(project);
            ProjectUow.Commit();
            if (project.Status == true)
            {
                //sendLiveProjectEmailToOwner(project, templateTypeId);
            }
            var ScheduleEmailData = ScheduleEmailUow.Repository<ScheduleEmail>().FindBy(a => a.ProjectId == project.ProjectId);
            foreach (var data in ScheduleEmailData)
            {
                var scheduleEmail = new ScheduleEmail()
                {
                    IsSentScheduleEmail = data.IsSentScheduleEmail,
                    InactivityDays = project.NoOfDays,
                    EmailFrom = data.EmailFrom,
                    EmailTo = data.EmailTo,
                    RequestedDateTime = data.RequestedDateTime,
                    EmailTemplateName = data.EmailTemplateName,
                    ModuleName = data.ModuleName,
                    ProjectId = data.ProjectId,
                    ProjectModuleId = data.ProjectModuleId,
                    ProjectName = data.ProjectName,
                    ScheduleEmailId = data.ScheduleEmailId
                };
                scheduleEmail.InactivityDays = project.NoOfDays;
                ScheduleEmailUow.RegisterDirty<ScheduleEmail>(scheduleEmail);
            }
            ScheduleEmailUow.Commit();
            //Update Project Module => when project is close ------------------------
            UpdateRecentActivityAndNotification(project, templateTypeId);

            return project;
        }

        private void sendLiveProjectEmailToOwner(Project project, int templateTypeId)
        {
            try
            {
                var user = ProjectUow.Repository<User>().SingleOrDefault(t => t.UserId == project.CreatedBy);

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(ServerSetting.Get<string>("emailSettings.MailServer"));

                string HTMLcontent = string.Empty;
                string test;

                var path = Path.Combine(Directory.GetCurrentDirectory(), ServerSetting.Get<string>("emailSettings.LiveProjectEmailReport"));
                System.IO.StreamReader file = new System.IO.StreamReader(path);
                while ((test = file.ReadLine()) != null)
                {
                    HTMLcontent += test;
                }
                file.Close();

                HTMLcontent = HTMLcontent.Replace("##OwnerName", user.FirstName + user.LastName);
                HTMLcontent = HTMLcontent.Replace("##ProjectName", project.ProjectName);

                mail.From = new MailAddress(ServerSetting.Get<string>("emailSettings.fromAddress"));
                mail.To.Add(user.Email);
                mail.Subject = "Project Live Report";
                byte[] pdfBytes = ExportReportPDFDomain.ExportHtmlToPdf(project.ProjectId, templateTypeId);
                var ms = new MemoryStream(pdfBytes);
                string name = project.ProjectName + ".pdf";
                mail.Attachments.Add(new Attachment(ms, name));
                mail.IsBodyHtml = true;
                mail.Body = HTMLcontent;

                SmtpServer.Port = Convert.ToInt32(ServerSetting.Get<string>("emailSettings.Port"));
                var credential = new System.Net.NetworkCredential();
                credential.UserName = ServerSetting.Get<string>("emailSettings.UserName");
                credential.Password = ServerSetting.Get<string>("emailSettings.PassWord");
                SmtpServer.Credentials = credential;
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                var spParameters = new object[11];

                spParameters[1] = new SqlParameter() { ParameterName = "projectId", Value = project.ProjectId };
                //spParameters[2] = new SqlParameter() { ParameterName = "projectModuleId", Value = 0 };
                spParameters[3] = new SqlParameter() { ParameterName = "to", Value = user.Email };
                spParameters[4] = new SqlParameter() { ParameterName = "from", Value = mail.From };
                spParameters[5] = new SqlParameter() { ParameterName = "subject", Value = mail.Subject };
                spParameters[6] = new SqlParameter() { ParameterName = "message", Value = mail.Body };
                spParameters[7] = new SqlParameter() { ParameterName = "status", Value = "SENT" };
                spParameters[8] = new SqlParameter() { ParameterName = "isSystem", Value = true };
                spParameters[9] = new SqlParameter() { ParameterName = "user", Value = 0 };
                spParameters[10] = new SqlParameter() { ParameterName = "updateBy", Value = 0 };

                DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.NewEmailMessage @projectId , @to , @from , @subject , @message , @status , @isSystem , @user , @updateBy ", spParameters); // change ' dbo.spEmailTransaction ' to ' dbo.spEmailTransactions '
                
            }
            catch (Exception ex)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/EmailLogs/ErrorLogs.txt");

                File.AppendAllText(path, ex.Message + Environment.NewLine);
            }
        }

        private void UpdateRecentActivityAndNotification(Project project, int templateTypeId)
        {
            var userData = ProjectUow.Repository<User>().SingleOrDefault(b => b.UserId == UserClaim.UserId);
            var backgroundModule = new RedSheet.DbEntities.Models.ProjectModule();
            if (templateTypeId == 1)
            {
                backgroundModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.Background);
            }
            else if (templateTypeId == 2)
            {
                backgroundModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.BackgroundToTheNegotiation);
            }
            else if (templateTypeId == 3)
            {
                backgroundModule = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectId == project.ProjectId && t.TemplateModuleId == (int)ModuleName.ScopetoNegotiateandObjectives);
            }

            if (project.IsClosed == true && project.OwnerId == UserClaim.UserId)
            {
                var projectModuleList = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindBy(a => a.ProjectId == project.ProjectId);
                foreach (var projectModule in projectModuleList)
                {
                    projectModule.IsClosed = true;
                    ProjectModuleUow.RegisterDirty<RedSheet.DbEntities.Models.ProjectModule>(projectModule);
                }
                var recentCloseActivity = new RecentActivityAndNotification()
                {
                    RecentActivityAndNotificationName = project.ProjectName + " is closed by " + userData.FirstName,
                    URL = "",
                    IsNotification = false,
                    ProjectModuleId = backgroundModule.ProjectModuleId,
                    ProjectId = project.ProjectId,
                    UserId = UserClaim.UserId,
                    IsSeen = false,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = 0,
                    TemplateModuleName = "",
                    NotificationStatus = null
                };
                ProjectUow.RegisterNew<RecentActivityAndNotification>(recentCloseActivity);
            }
            // Below else if condition for the CR: 
            // New Action Make Active
            // Behaviour: Reopens the project and changes state from archive to editable.Returns project to editable state-reactivates
            else if (project.IsClosed == false && project.OwnerId == UserClaim.UserId)
            {
                var projectModuleList = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindBy(a => a.ProjectId == project.ProjectId);
                foreach (var projectModule in projectModuleList)
                {
                    projectModule.IsClosed = false;
                    ProjectModuleUow.RegisterDirty<DbEntities.Models.ProjectModule>(projectModule);
                }
                var recentCloseActivity = new RecentActivityAndNotification()
                {
                    RecentActivityAndNotificationName = project.ProjectName + " is reactived by " + userData.FirstName,
                    URL = "",
                    IsNotification = false,
                    ProjectModuleId = backgroundModule.ProjectModuleId,
                    ProjectId = project.ProjectId,
                    UserId = UserClaim.UserId,
                    IsSeen = false,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = 0,
                    TemplateModuleName = "",
                    NotificationStatus = null
                };
                ProjectUow.RegisterNew<RecentActivityAndNotification>(recentCloseActivity);
            }
            else if (project.Status == true && project.OwnerId == UserClaim.UserId)
            {
                var projectModuleList = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindBy(a => a.ProjectId == project.ProjectId);
                foreach (var projectModule in projectModuleList)
                {
                    projectModule.Status = true;
                    ProjectModuleUow.RegisterDirty<RedSheet.DbEntities.Models.ProjectModule>(projectModule);
                }
                var recentLiveActivity = new RecentActivityAndNotification()
                {
                    RecentActivityAndNotificationName = project.ProjectName + " is lived by " + userData.FirstName,
                    URL = "",
                    IsNotification = false,
                    ProjectModuleId = backgroundModule.ProjectModuleId,
                    ProjectId = project.ProjectId,
                    UserId = UserClaim.UserId,
                    IsSeen = false,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = 0,
                    TemplateModuleName = "",
                    NotificationStatus = null
                };
                ProjectUow.RegisterNew<RecentActivityAndNotification>(recentLiveActivity);
            }
            else if (project.OwnerId != UserClaim.UserId)
            {
                var ownerNameData = ProjectUow.Repository<User>().SingleOrDefault(b => b.UserId == project.OwnerId);
                var recentActivityOwnership = new RecentActivityAndNotification()
                {
                    RecentActivityAndNotificationName = userData.FirstName + " has transfer ownership to " + ownerNameData.FirstName + " Of " + project.ProjectName,
                    URL = "",
                    IsNotification = false,
                    ProjectModuleId = backgroundModule.ProjectModuleId,
                    ProjectId = project.ProjectId,
                    UserId = UserClaim.UserId,
                    IsSeen = false,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = 0,
                    TemplateModuleName = "",
                    NotificationStatus = null
                };
                ProjectUow.RegisterNew<RecentActivityAndNotification>(recentActivityOwnership);
            }
            else
            {
                var recentActivity = new RecentActivityAndNotification()
                {
                    RecentActivityAndNotificationName = project.ProjectName + " is updated by " + userData.FirstName,
                    URL = "",
                    IsNotification = false,
                    ProjectModuleId = backgroundModule.ProjectModuleId,
                    ProjectId = project.ProjectId,
                    UserId = UserClaim.UserId,
                    IsSeen = false,
                    UpdatedBy = UserClaim.UserId,
                    UpdatedOn = DateTime.Now,
                    TemplateModuleId = 0,
                    TemplateModuleName = "",
                    NotificationStatus = null
                };
                ProjectUow.RegisterNew<RecentActivityAndNotification>(recentActivity);
            }
            ProjectUow.Commit();
            ProjectModuleUow.Commit();
        }

        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<Project>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {

            #region Delete RecentActivityAndNotification
            var RecentActivityAndNotificationList = ProjectUow.Repository<RecentActivityAndNotification>().FindBy(a => a.ProjectId == id);
            foreach (var item in RecentActivityAndNotificationList)
            {
                ProjectUow.RegisterDeleted<RecentActivityAndNotification>(item);
            }
            #endregion Delete RecentActivityAndNotification

            #region Delete ScheduleEmail
            var ScheduleEmailDataList = ScheduleEmailUow.Repository<ScheduleEmail>().FindBy(a => a.ProjectId == id);
            foreach (var item in ScheduleEmailDataList)
            {
                ScheduleEmailUow.RegisterDeleted<ScheduleEmail>(item);
            }
            #endregion Delete ScheduleEmail

            #region ExportReportPDF
            var ExportPDFList = ExportReportUow.Repository<RedSheet.DbEntities.Models.ExportReportPDF>().FindBy(t => t.ProjectId == id);
            foreach (var item in ExportPDFList)
            {
                ExportReportUow.RegisterDeleted<ExportReportPDF>(item);
            }
            #endregion

            #region Delete ProjectModule
            var ProjectModuleList = ProjectUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FindBy(t => t.ProjectId == id);
            foreach (var item in ProjectModuleList)
            {
                #region Delete ProjectModuleAssignee
                var ProjectModuleAssigneeList = ProjectUow.Repository<ProjectModuleAssignee>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var sitem in ProjectModuleAssigneeList)
                {
                    ProjectUow.RegisterDeleted<ProjectModuleAssignee>(sitem);
                }

                #endregion

                #region Delete LiteMeetingManagements
                var LiteMeetingManagementsList = LiteMeetingManagementUow.Repository<LiteMeetingManagement>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var LM_item in LiteMeetingManagementsList)
                {
                    #region Delete LiteEventPlanningActions
                    var LiteEventPlanningActions_List = LiteMeetingManagementUow.Repository<LiteEventPlanningAction>().FindBy(a => a.LiteMeetingManagementId == LM_item.LiteMeetingManagementId);
                    foreach (var LEPA_item in LiteEventPlanningActions_List)
                    {
                        LiteMeetingManagementUow.RegisterDeleted<LiteEventPlanningAction>(LEPA_item);
                    }
                    #endregion

                    #region Delete LiteMeetingManagementTimings
                    var LiteMeetingManagementTiming_List = LiteMeetingManagementUow.Repository<LiteMeetingManagementTiming>().FindBy(a => a.LiteMeetingManagementId == LM_item.LiteMeetingManagementId);
                    foreach (var LMMT_item in LiteMeetingManagementTiming_List)
                    {
                        LiteMeetingManagementUow.RegisterDeleted<LiteMeetingManagementTiming>(LMMT_item);
                    }
                    #endregion

                    #region Delete LiteMeetingPlanning
                    var LiteMeetingPlanning_List = LiteMeetingManagementUow.Repository<LiteMeetingPlanning>().FindBy(a => a.LiteMeetingManagementId == LM_item.LiteMeetingManagementId);
                    foreach (var LMP_item in LiteMeetingPlanning_List)
                    {
                        LiteMeetingManagementUow.RegisterDeleted<LiteMeetingPlanning>(LMP_item);
                    }
                    #endregion

                    LiteMeetingManagementUow.RegisterDeleted<LiteMeetingManagement>(LM_item);
                }

                #endregion  LiteMeetingManagements

                #region Delete LiteProjectBackground
                var LiteProjectBackground_List = LiteProjectBackgroundUow.Repository<LiteProjectBackground>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var LPB_item in LiteProjectBackground_List)
                {
                    #region Delete LiteBackgroundCommunicationMode
                    var LiteBackgroundCommunicationMode_List = LiteProjectBackgroundUow.Repository<LiteBackgroundCommunicationMode>().FindBy(a => a.LiteProjectBackgroundId == LPB_item.LiteProjectBackgroundId);
                    foreach (var LBCM_item in LiteBackgroundCommunicationMode_List)
                    {
                        LiteProjectBackgroundUow.RegisterDeleted<LiteBackgroundCommunicationMode>(LBCM_item);
                    }
                    #endregion

                    #region Delete LiteOurTeamMember
                    var LiteOurTeamMember_List = LiteProjectBackgroundUow.Repository<LiteOurTeamMember>().FindBy(a => a.LiteProjectBackgroundId == LPB_item.LiteProjectBackgroundId);
                    foreach (var LOTM_item in LiteOurTeamMember_List)
                    {
                        LiteProjectBackgroundUow.RegisterDeleted<LiteOurTeamMember>(LOTM_item);
                    }
                    #endregion

                    #region Delete LiteTarget
                    var LiteTarget_List = LiteProjectBackgroundUow.Repository<LiteTarget>().FindBy(a => a.LiteProjectBackgroundId == LPB_item.LiteProjectBackgroundId);
                    foreach (var LT_item in LiteTarget_List)
                    {
                        LiteProjectBackgroundUow.RegisterDeleted<LiteTarget>(LT_item);
                    }
                    #endregion

                    #region Delete LiteTheirTeamMember
                    var LiteTheirTeamMember_List = LiteProjectBackgroundUow.Repository<LiteTheirTeamMember>().FindBy(a => a.LiteProjectBackgroundId == LPB_item.LiteProjectBackgroundId);
                    foreach (var LTTM_item in LiteTheirTeamMember_List)
                    {
                        LiteProjectBackgroundUow.RegisterDeleted<LiteTheirTeamMember>(LTTM_item);
                    }
                    #endregion

                    LiteProjectBackgroundUow.RegisterDeleted<LiteProjectBackground>(LPB_item);
                }

                #endregion

                #region Delete NanoDiscussionSequence
                var NanoDiscussionSequence_List = ProjectModuleUow.Repository<NanoDiscussionSequence>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var NDS_item in NanoDiscussionSequence_List)
                {
                    ProjectModuleUow.RegisterDeleted<NanoDiscussionSequence>(NDS_item);
                }
                #endregion

                #region Delete NanoOurBatna
                var NanoOurBatna_List = ProjectModuleUow.Repository<NanoOurBatna>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var NOB_item in NanoOurBatna_List)
                {
                    ProjectModuleUow.RegisterDeleted<NanoOurBatna>(NOB_item);
                }
                #endregion

                #region Delete NanoProjectNegotiable
                var NanoProjectNegotiable_List = ProjectModuleUow.Repository<NanoProjectNegotiable>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var NPN_item in NanoProjectNegotiable_List)
                {
                    ProjectModuleUow.RegisterDeleted<NanoProjectNegotiable>(NPN_item);
                }
                #endregion

                #region Delete NanoScopeToNegotiateObjective
                var NanoScopeToNegotiateObjective_List = NanoScopeToNegotiateObjectiveUow.Repository<NanoScopeToNegotiateObjective>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var NSTNO_item in NanoScopeToNegotiateObjective_List)
                {
                    #region Delete NanoOurObjective
                    var NanoOurObjective_List = NanoScopeToNegotiateObjectiveUow.Repository<NanoOurObjective>().FindBy(a => a.NanoScopeToNegotiateObjectiveId == NSTNO_item.NanoScopeToNegotiateObjectiveId);
                    foreach (var NOO_item in NanoOurObjective_List)
                    {
                        NanoScopeToNegotiateObjectiveUow.RegisterDeleted<NanoOurObjective>(NOO_item);
                    }
                    #endregion

                    #region Delete NanoScopeToNegotiateCommunicationMode
                    var NanoScopeToNegotiateCommunicationMode_List = NanoScopeToNegotiateObjectiveUow.Repository<NanoScopeToNegotiateCommunicationMode>().FindBy(a => a.NanoScopeToNegotiateObjectiveId == NSTNO_item.NanoScopeToNegotiateObjectiveId);
                    foreach (var NCM_item in NanoScopeToNegotiateCommunicationMode_List)
                    {
                        NanoScopeToNegotiateObjectiveUow.RegisterDeleted<NanoScopeToNegotiateCommunicationMode>(NCM_item);
                    }
                    #endregion

                    NanoScopeToNegotiateObjectiveUow.RegisterDeleted<NanoScopeToNegotiateObjective>(NSTNO_item);
                }
                #endregion

                #region Delete NanoTheirBatna
                var NanoTheirBatna_List = ProjectModuleUow.Repository<NanoTheirBatna>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var NPN_item in NanoTheirBatna_List)
                {
                    ProjectModuleUow.RegisterDeleted<NanoTheirBatna>(NPN_item);
                }
                #endregion

                #region Delete ProjectBackground
                var ProjectBackground_List = ProjectBackgroundUow.Repository<ProjectBackground>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PB_item in ProjectBackground_List)
                {
                    #region Delete BackgroundEvent
                    var BackgroundEvent_List = ProjectBackgroundUow.Repository<BackgroundEvent>().FindBy(a => a.ProjectBackgroundId == PB_item.ProjectBackgroundId);
                    foreach (var BE_item in BackgroundEvent_List)
                    {
                        ProjectBackgroundUow.RegisterDeleted<BackgroundEvent>(BE_item);
                    }
                    #endregion

                    #region Delete LongTermObjective
                    var LongTermObjective_List = ProjectBackgroundUow.Repository<LongTermObjective>().FindBy(a => a.ProjectBackgroundId == PB_item.ProjectBackgroundId);
                    foreach (var LTO_item in LongTermObjective_List)
                    {
                        ProjectBackgroundUow.RegisterDeleted<LongTermObjective>(LTO_item);
                    }
                    #endregion

                    ProjectBackgroundUow.RegisterDeleted<ProjectBackground>(PB_item);
                }

                #endregion

                #region Delete ProjectCarryForward
                var ProjectCarryForward_List = ProjectModuleUow.Repository<ProjectCarryForward>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PCF_item in ProjectCarryForward_List)
                {
                    ProjectModuleUow.RegisterDeleted<ProjectCarryForward>(PCF_item);
                }
                #endregion

                #region Delete ProjectCulture
                var ProjectCulture_List = ProjectCultureUow.Repository<ProjectCulture>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PC_item in ProjectCulture_List)
                {
                    #region Delete Culture
                    var Culture_List = ProjectCultureUow.Repository<Culture>().FindBy(a => a.ProjectCultureId == PC_item.ProjectCultureId);
                    foreach (var C_item in Culture_List)
                    {
                        ProjectCultureUow.RegisterDeleted<Culture>(C_item);
                    }
                    #endregion

                    ProjectCultureUow.RegisterDeleted<ProjectCulture>(PC_item);
                }

                #endregion

                #region Delete ProjectEventTimeline
                var ProjectEventTimeline_List = ProjectEventTimelineUow.Repository<ProjectEventTimeline>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PET_item in ProjectEventTimeline_List)
                {
                    #region Delete ArrivalAndOpeningTactic
                    var ArrivalAndOpeningTactic_List = ProjectEventTimelineUow.Repository<ArrivalAndOpeningTactic>().FindBy(a => a.ProjectEventTimelineId == PET_item.ProjectEventTimelineId);
                    foreach (var AAO_item in ArrivalAndOpeningTactic_List)
                    {
                        ProjectEventTimelineUow.RegisterDeleted<ArrivalAndOpeningTactic>(AAO_item);
                    }
                    #endregion

                    #region Delete EventAgendaTiming
                    var EventAgendaTiming_List = ProjectEventTimelineUow.Repository<EventAgendaTiming>().FindBy(a => a.ProjectEventTimelineId == PET_item.ProjectEventTimelineId);
                    foreach (var EAT_item in EventAgendaTiming_List)
                    {
                        ProjectEventTimelineUow.RegisterDeleted<EventAgendaTiming>(EAT_item);
                    }
                    #endregion

                    ProjectEventTimelineUow.RegisterDeleted<ProjectEventTimeline>(PET_item);
                }

                #endregion

                #region Delete ProjectGameDetail
                var ProjectGameDetail_List = ProjectGameUow.Repository<ProjectGameDetail>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PG_item in ProjectGameDetail_List)
                {
                    #region Delete Game
                    var Game_List = ProjectGameUow.Repository<Game>().FindBy(a => a.ProjectGameDetailId == PG_item.ProjectGameDetailId);
                    foreach (var G_item in Game_List)
                    {
                        ProjectGameUow.RegisterDeleted<Game>(G_item);
                    }
                    #endregion

                    ProjectGameUow.RegisterDeleted<ProjectGameDetail>(PG_item);
                }
                #endregion

                #region Delete ProjectModuleReview
                var ProjectModuleReview_List = ProjectModuleUow.Repository<ProjectModuleReview>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PMR_item in ProjectModuleReview_List)
                {
                    ProjectModuleUow.RegisterDeleted<ProjectModuleReview>(PMR_item);
                }
                #endregion

                #region Delete ProjectNegotiation
                var ProjectNegotiation_List = ProjectNegotiationUow.Repository<ProjectNegotiation>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PN_item in ProjectNegotiation_List)
                {
                    #region Delete Target
                    var Target_List = ProjectNegotiationUow.Repository<Target>().FindBy(a => a.ProjectNegotiationId == PN_item.ProjectNegotiationId);
                    foreach (var T_item in Target_List)
                    {
                        ProjectNegotiationUow.RegisterDeleted<Target>(T_item);
                    }
                    #endregion

                    #region Delete TheirTeamCommunicationMode
                    var TheirTeamCommunicationMode_List = ProjectNegotiationUow.Repository<TheirTeamCommunicationMode>().FindBy(a => a.ProjectNegotiationId == PN_item.ProjectNegotiationId);
                    foreach (var TTCM_item in TheirTeamCommunicationMode_List)
                    {
                        ProjectNegotiationUow.RegisterDeleted<TheirTeamCommunicationMode>(TTCM_item);
                    }
                    #endregion

                    #region Delete TheirTeamMember
                    var TheirTeamMember_List = ProjectNegotiationUow.Repository<TheirTeamMember>().FindBy(a => a.ProjectNegotiationId == PN_item.ProjectNegotiationId);
                    foreach (var TTM_item in TheirTeamMember_List)
                    {
                        ProjectNegotiationUow.RegisterDeleted<TheirTeamMember>(TTM_item);
                    }
                    #endregion

                    ProjectNegotiationUow.RegisterDeleted<ProjectNegotiation>(PN_item);
                }
                #endregion

                #region Delete ProjectNegotionality
                var ProjectNegotionality_List = ProjectNegotionalityUow.Repository<ProjectNegotionality>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PN_item in ProjectNegotionality_List)
                {
                    #region Delete OurTeamMember
                    var OurTeamMember_List = ProjectNegotionalityUow.Repository<OurTeamMember>().FindBy(a => a.ProjectNegotionalityId == PN_item.ProjectNegotionalityId);
                    foreach (var O_item in OurTeamMember_List)
                    {
                        var OurTeamMemberBehaviour_List = ProjectNegotionalityUow.Repository<OurTeamMemberBehaviour>().FindBy(a => a.OurTeamMemberId == O_item.OurTeamMemberId);
                        foreach (var OTMB_item in OurTeamMemberBehaviour_List)
                        {
                            ProjectNegotionalityUow.RegisterDeleted<OurTeamMemberBehaviour>(OTMB_item);
                        }

                        var OurTeamMemberRequires_List = ProjectNegotionalityUow.Repository<OurTeamMemberRequire>().FindBy(a => a.OurTeamMemberId == O_item.OurTeamMemberId);
                        foreach (var OTMR_item in OurTeamMemberRequires_List)
                        {
                            ProjectNegotionalityUow.RegisterDeleted<OurTeamMemberRequire>(OTMR_item);
                        }
                        ProjectNegotionalityUow.RegisterDeleted<OurTeamMember>(O_item);
                    }
                    #endregion

                    ProjectNegotionalityUow.RegisterDeleted<ProjectNegotionality>(PN_item);
                }

                #endregion

                #region Delete ProjectOutcomeAndLearning
                var ProjectOutcomeAndLearning_List = ProjectLearningUow.Repository<ProjectOutcomeAndLearning>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var POL_item in ProjectOutcomeAndLearning_List)
                {
                    ProjectLearningUow.RegisterDeleted<ProjectOutcomeAndLearning>(POL_item);
                }
                #endregion

                #region Delete ProjectPostEventAction
                var ProjectPostEventAction_List = ProjectModuleUow.Repository<ProjectPostEventAction>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PPE_item in ProjectPostEventAction_List)
                {
                    ProjectModuleUow.RegisterDeleted<ProjectPostEventAction>(PPE_item);
                }
                #endregion

                #region Delete ProjectPower
                var ProjectPower_List = ProjectPowerUow.Repository<ProjectPower>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PP_item in ProjectPower_List)
                {
                    #region Delete KnowledgeGatheringPlan
                    var KnowledgeGatheringPlan_List = ProjectPowerUow.Repository<KnowledgeGatheringPlan>().FindBy(a => a.ProjectPowerId == PP_item.ProjectPowerId);
                    foreach (var KGP_item in KnowledgeGatheringPlan_List)
                    {
                        ProjectPowerUow.RegisterDeleted<KnowledgeGatheringPlan>(KGP_item);
                    }
                    #endregion

                    #region Delete PowerTypeDetail
                    var PowerTypeDetail_List = ProjectPowerUow.Repository<PowerTypeDetail>().FindBy(a => a.ProjectPowerId == PP_item.ProjectPowerId);
                    foreach (var PT_item in PowerTypeDetail_List)
                    {
                        ProjectPowerUow.RegisterDeleted<PowerTypeDetail>(PT_item);
                    }
                    #endregion

                    ProjectPowerUow.RegisterDeleted<ProjectPower>(PP_item);
                }

                #endregion

                #region Delete ProjectPreparation
                var ProjectPreparation_List = ProjectPreparationUow.Repository<ProjectPreparation>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PP_item in ProjectPreparation_List)
                {
                    #region Delete CommunicationPlan
                    var CommunicationPlan_List = ProjectPreparationUow.Repository<CommunicationPlan>().FindBy(a => a.ProjectPreparationId == PP_item.ProjectPreparationId);
                    foreach (var CP_item in CommunicationPlan_List)
                    {
                        ProjectPreparationUow.RegisterDeleted<CommunicationPlan>(CP_item);
                    }
                    #endregion

                    #region Delete EventPlanningAction
                    var EventPlanningAction_List = ProjectPreparationUow.Repository<EventPlanningAction>().FindBy(a => a.ProjectPreparationId == PP_item.ProjectPreparationId);
                    foreach (var EP_item in EventPlanningAction_List)
                    {
                        ProjectPreparationUow.RegisterDeleted<EventPlanningAction>(EP_item);
                    }
                    #endregion

                    ProjectPreparationUow.RegisterDeleted<ProjectPreparation>(PP_item);
                }

                #endregion

                #region Delete ProjectRequirement
                var ProjectRequirement_List = ProjectRequirementUow.Repository<ProjectRequirement>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PR_item in ProjectRequirement_List)
                {
                    #region Delete Ourbatna
                    var Ourbatna_List = ProjectRequirementUow.Repository<Ourbatna>().FindBy(a => a.ProjectRequirementId == PR_item.ProjectRequirementId);
                    foreach (var O_item in Ourbatna_List)
                    {
                        ProjectRequirementUow.RegisterDeleted<Ourbatna>(O_item);
                    }
                    #endregion

                    #region Delete OurRequirementDetail
                    var OurRequirementDetail_List = ProjectRequirementUow.Repository<OurRequirementDetail>().FindBy(a => a.ProjectRequirementId == PR_item.ProjectRequirementId);
                    foreach (var OR_item in OurRequirementDetail_List)
                    {
                        ProjectRequirementUow.RegisterDeleted<OurRequirementDetail>(OR_item);
                    }
                    #endregion

                    #region Delete TheirBatna
                    var TheirBatna_List = ProjectRequirementUow.Repository<TheirBatna>().FindBy(a => a.ProjectRequirementId == PR_item.ProjectRequirementId);
                    foreach (var TB_item in TheirBatna_List)
                    {
                        ProjectRequirementUow.RegisterDeleted<TheirBatna>(TB_item);
                    }
                    #endregion

                    #region Delete TheirRequirementDetail
                    var TheirRequirementDetail_List = ProjectRequirementUow.Repository<TheirRequirementDetail>().FindBy(a => a.ProjectRequirementId == PR_item.ProjectRequirementId);
                    foreach (var TR_item in TheirRequirementDetail_List)
                    {
                        ProjectRequirementUow.RegisterDeleted<TheirRequirementDetail>(TR_item);
                    }
                    #endregion

                    ProjectRequirementUow.RegisterDeleted<ProjectRequirement>(PR_item);
                }

                #endregion

                #region Delete ProjectStakeholder
                var ProjectStakeholder_List = ProjectStakeholderUow.Repository<ProjectStakeholder>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PS_item in ProjectStakeholder_List)
                {
                    #region Delete StakeholderCommunicationMode
                    var StakeholderCommunicationMode_List = ProjectStakeholderUow.Repository<StakeholderCommunicationMode>().FindBy(a => a.ProjectStakeholderId == PS_item.ProjectStakeholderId);
                    foreach (var SCM_item in StakeholderCommunicationMode_List)
                    {
                        ProjectStakeholderUow.RegisterDeleted<StakeholderCommunicationMode>(SCM_item);
                    }
                    #endregion

                    ProjectStakeholderUow.RegisterDeleted<ProjectStakeholder>(PS_item);
                }

                #endregion

                #region Delete projectModuleReviewers
                var projectModuleReviewers_List = ProjectUow.Repository<ProjectModuleReviewer>().FindBy(a => a.ProjectModuleId == item.ProjectModuleId);
                foreach (var PS_item in projectModuleReviewers_List)
                {
                    ProjectUow.RegisterDeleted<ProjectModuleReviewer>(PS_item);
                }

                #endregion

                ProjectUow.RegisterDeleted<RedSheet.DbEntities.Models.ProjectModule>(item);

                LiteMeetingManagementUow.Commit();
                LiteMeetingManagementUow.Refresh();

                LiteProjectBackgroundUow.Commit();
                LiteProjectBackgroundUow.Refresh();

                NanoScopeToNegotiateObjectiveUow.Commit();
                NanoScopeToNegotiateObjectiveUow.Refresh();

                ProjectBackgroundUow.Commit();
                ProjectBackgroundUow.Refresh();

                ProjectCultureUow.Commit();
                ProjectCultureUow.Refresh();

                ProjectEventTimelineUow.Commit();
                ProjectEventTimelineUow.Refresh();

                ProjectGameUow.Commit();
                ProjectGameUow.Refresh();

                ProjectNegotiationUow.Commit();
                ProjectNegotiationUow.Refresh();

                ProjectNegotionalityUow.Commit();
                ProjectNegotionalityUow.Refresh();

                ProjectLearningUow.Commit();
                ProjectLearningUow.Refresh();

                ProjectPowerUow.Commit();
                ProjectPowerUow.Refresh();

                ProjectPreparationUow.Commit();
                ProjectPreparationUow.Refresh();

                ProjectRequirementUow.Commit();
                ProjectRequirementUow.Refresh();

                ProjectStakeholderUow.Commit();
                ProjectStakeholderUow.Refresh();

                ProjectModuleUow.Commit();
                ProjectModuleUow.Refresh();

                ProjectUow.Commit();
                ProjectUow.Refresh();
            }
            #endregion

            var project = ProjectUow.Repository<Project>().FindByKey(id);

            ExportReportUow.Commit();
            ExportReportUow.Refresh();

            ScheduleEmailUow.Commit();
            ScheduleEmailUow.Refresh();

            List<ProjectModuleAssigneesOrReviewer> projectModuleAssigneesOrReviewers = ProjectUow.Repository<ProjectModuleAssigneesOrReviewer>().All()
                    .Where(c => c.ProjectId == id).ToList();

            foreach (var item in projectModuleAssigneesOrReviewers)
            {
                ProjectUow.RegisterDeleted<ProjectModuleAssigneesOrReviewer>(item);
            }

            ProjectUow.RegisterDeleted<Project>(project);
            ProjectUow.Commit();
        }

        private void CommonValidation(Project project)
        {

        }

        public string GetUrl(int projectModuleId)
        {
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = projectModuleId };
            spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
            var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetUrl @ProjectModuleId, @UserId", spParameters).Result;
            return storeProcSearchResult.SingleOrDefault()?.Result;
        }

        public int CreateCopy(int projectId)
        {
            try
            {
                Project projectDb = ProjectUow.Repository<Project>().FindByInclude(c => c.ProjectId == projectId, i=>i.ProjectModules,
                                                                                                                    i => i.ProjectModules
                                                                                                                    , j=>j.ProjectModuleAssigneesOrReviewers).FirstOrDefault();

                Project project = new Project()
                {
                    ProjectName = string.Concat(projectDb.ProjectName, " - COPY"),
                    IsAllowCustomization = projectDb.IsAllowCustomization,
                    IsClosed = projectDb.IsClosed,
                    IsStarted = projectDb.IsStarted,
                    ModuleIdReached = projectDb.ModuleIdReached,
                    NegotiationRoleId = projectDb.NegotiationRoleId,
                    NoOfDays = projectDb.NoOfDays,
                    ProjectNote = projectDb.ProjectNote,
                    PublishDate = projectDb.PublishDate,
                    ReporteeName = projectDb.ReporteeName,
                    TemplateGroupId = projectDb.TemplateGroupId,
                    TemplateName = projectDb.TemplateName,
                    TemplateId = projectDb.TemplateId,
                    Status = false,
                    OwnerId = UserClaim.UserId,
                    CreatedBy = UserClaim.UserId,
                    CreatedOn = DateTime.Now,
                    UpdatedBy = null,
                    UpdatedOn = null,
                };
               

                ICollection<DbEntities.Models.ProjectModule> projectModulesDb = ProjectUow.Repository<DbEntities.Models.ProjectModule>().All().Where(c => c.ProjectId == projectId).ToList();
                List<DbEntities.Models.ProjectModule> projectModules = new List<DbEntities.Models.ProjectModule>();

                foreach (var projectModuleDb in projectModulesDb)
                {
                    DbEntities.Models.ProjectModule projectModule = new DbEntities.Models.ProjectModule()
                    {
                        TemplateModuleId = projectModuleDb.TemplateModuleId,
                        TemplateModuleName = projectModuleDb.TemplateModuleName,
                        ModuleOrder = projectModuleDb.ModuleOrder,
                        OwnerNote = projectModuleDb.OwnerNote,
                        Status = projectModuleDb.Status,
                        HTMLHelp = projectModuleDb.HTMLHelp,
                        IsClosed = projectModuleDb.IsClosed,
                        BaseId = projectModuleDb.BaseId,
                        DependantModuleId = projectModuleDb.DependantModuleId,
                        IsVisited = projectModuleDb.IsVisited,
                        CreatedBy = UserClaim.UserId,
                        CreatedOn = DateTime.Now,
                        UpdatedBy = null,
                        UpdatedOn = null,
                    };

                    projectModules.Add(projectModule);
                }

                project.ProjectModules = projectModules;

                ProjectUow.RegisterNew<Project>(project);
                ProjectUow.Commit();

                #region Project background module

                var projectBackgroudModules = projectModulesDb.FirstOrDefault(t => t.TemplateModuleId == (int)ModuleName.Background);
                var projectBackgroudModuleId = projectBackgroudModules != null ? projectBackgroudModules.ProjectModuleId : 0;
                var projectBackgorund = ProjectUow.Repository<ProjectBackground>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.LongTermObjectives, p => p.BackgroundEvents).FirstOrDefault();
                if (projectBackgorund != null)
                {
                    projectBackgorund.ProjectBackgroundId = 0;
                    projectBackgorund.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Background && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectBackgorund.LongTermObjectives = projectBackgorund.LongTermObjectives.Select(t => { t.LongTermObjectiveId = 0; t.ProjectBackgroundId = 0; return t; }).ToList();
                    projectBackgorund.BackgroundEvents = projectBackgorund.BackgroundEvents.Select(t => { t.BackgroundEventId = 0; t.ProjectBackgroundId = 0; return t; }).ToList();
                    ProjectBackgroundUow.RegisterNew<ProjectBackground>(projectBackgorund);
                    ProjectBackgroundUow.Commit();

                    var projectModuleReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectBackgroudModuleId);
                    if (projectModuleReviews != null)
                    {
                        projectModuleReviews.ProjectModuleId = projectBackgorund.ProjectModuleId;
                        projectModuleReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectModuleReviews);
                        ProjectModuleUow.Commit();
                    }
                }
                


                #endregion

                #region Project Stakeholders Module
                var projectStakeHolders = ProjectUow.Repository<ProjectStakeholder>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.StakeholderCommunicationModes).ToList();
                if (projectStakeHolders.Count > 0)
                {
                    foreach(var item in projectStakeHolders)
                    {
                        item.ProjectStakeholderId = 0;
                        item.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Stakeholder && t.ProjectId == project.ProjectId).ProjectModuleId;
                        item.StakeholderCommunicationModes = item.StakeholderCommunicationModes
                                                .Select(t => { t.StakeholderCommunicationModeId = 0; t.ProjectStakeholderId = 0; return t; }).ToList();
                        ProjectStakeholderUow.RegisterNew<ProjectStakeholder>(item);
                        ProjectStakeholderUow.Commit();
                    }
                    var projectStakeHolderModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.Stakeholder);
                    var projectStakeHolderModuleId = projectStakeHolderModules != null ? projectStakeHolderModules.ProjectModuleId : 0;
                    var projectModuleStakeHolderReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectStakeHolderModuleId);
                    if (projectModuleStakeHolderReviews != null)
                    {
                        projectModuleStakeHolderReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Stakeholder && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectModuleStakeHolderReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectModuleStakeHolderReviews);
                        ProjectModuleUow.Commit();
                    }

                }

                #endregion

                #region for Project Culture Module
                var projectCulture = ProjectUow.Repository<ProjectCulture>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.Cultures).FirstOrDefault();
                if (projectCulture != null)
                {
                    projectCulture.ProjectCultureId = 0;
                    projectCulture.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Culture && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectCulture.Cultures = projectCulture.Cultures.Select(t => { t.CultureId = 0; t.ProjectCultureId = 0; return t; }).ToList();
                    ProjectCultureUow.RegisterNew<ProjectCulture>(projectCulture);
                    ProjectCultureUow.Commit();

                    //For feedback
                    var projectCultureModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.Culture);
                    var projectCultureModuleId = projectCultureModules != null ? projectCultureModules.ProjectModuleId : 0;
                    var projectModuleCultureReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectCultureModuleId);
                    if (projectModuleCultureReviews != null)
                    {
                        projectModuleCultureReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Culture && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectModuleCultureReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectModuleCultureReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                
                #endregion

                #region ProjectNegotionality Module
                var projectNegotionality = ProjectUow.Repository<ProjectNegotionality>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId).FirstOrDefault();

                if (projectNegotionality != null)
                {
                    var ourteamMember = ProjectUow.Repository<OurTeamMember>().
                             FindByInclude(t => t.ProjectNegotionalityId == projectNegotionality.ProjectNegotionalityId, i => i.OurTeamMemberBehaviours, o => o.OurTeamMemberRequires).ToList();
                    foreach (var item in ourteamMember)
                    {
                        item.OurTeamMemberBehaviours = item.OurTeamMemberBehaviours.Select(t => { t.OurTeamMemberBehaviourId = 0; t.OurTeamMemberId = 0; return t; }).ToList();
                        item.OurTeamMemberRequires = item.OurTeamMemberRequires.Select(t => { t.OurTeamMemberRequireId = 0; t.OurTeamMemberId = 0; return t; }).ToList();
                    }
                    projectNegotionality.ProjectNegotionalityId = 0;
                    projectNegotionality.OurTeamMembers = ourteamMember;
                    projectNegotionality.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Negotionality && t.ProjectId == project.ProjectId).ProjectModuleId;

                    projectNegotionality.OurTeamMembers = projectNegotionality.OurTeamMembers.Select(t => { t.OurTeamMemberId = 0; t.ProjectNegotionalityId = 0; return t; }).ToList();
                    ProjectNegotionalityUow.RegisterNew<ProjectNegotionality>(projectNegotionality);
                    ProjectNegotionalityUow.Commit();

                    //For feedback
                    var projectNegotionalityModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.Negotionality);
                    var projectNegotionalityModuleId = projectNegotionalityModules != null ? projectNegotionalityModules.ProjectModuleId : 0;
                    var projectNegotionalityReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectNegotionalityModuleId);
                    if (projectNegotionalityReviews != null)
                    {
                        projectNegotionalityReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Negotionality && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectNegotionalityReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectNegotionalityReviews);
                        ProjectModuleUow.Commit();
                    }
                }
                

                #endregion

                #region for Project Negotiation Module
                var projectNegotiation = ProjectUow.Repository<ProjectNegotiation>().FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.TheirTeamMembers, o => o.TheirTeamCommunicationModes, p => p.Targets).FirstOrDefault();
                if (projectNegotiation != null)
                {
                    projectNegotiation.ProjectNegotiationId = 0;
                    projectNegotiation.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.ThisNegotiation && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectNegotiation.TheirTeamCommunicationModes = projectNegotiation.TheirTeamCommunicationModes.Select(t => { t.TheirTeamCommunicationModeId = 0; t.ProjectNegotiationId = 0; return t; }).ToList();
                    projectNegotiation.TheirTeamMembers = projectNegotiation.TheirTeamMembers.Select(t => { t.TheirTeamMemberId = 0; t.ProjectNegotiationId = 0; return t; }).ToList();
                    projectNegotiation.Targets = projectNegotiation.Targets.Select(t => { t.TargetId = 0; t.ProjectNegotiationId = 0; return t; }).ToList();

                    ProjectNegotiationUow.RegisterNew<ProjectNegotiation>(projectNegotiation);
                    ProjectNegotiationUow.Commit();

                    //For feedback
                    var projectNegotiationModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.ThisNegotiation);
                    var projectNegotiationModuleId = projectNegotiationModules != null ? projectNegotiationModules.ProjectModuleId : 0;
                    var pprojectNegotiationReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectNegotiationModuleId);
                    if (pprojectNegotiationReviews != null)
                    {
                        pprojectNegotiationReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.ThisNegotiation && t.ProjectId == project.ProjectId).ProjectModuleId;
                        pprojectNegotiationReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(pprojectNegotiationReviews);
                        ProjectModuleUow.Commit();
                    }
                }
                

                #endregion

                #region Project Power Module

                var projectPower = ProjectUow.Repository<ProjectPower>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.PowerTypeDetails, p => p.KnowledgeGatheringPlans).FirstOrDefault();
                if (projectPower != null)
                {
                    projectPower.ProjectPowerId = 0;
                    projectPower.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Power && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectPower.PowerTypeDetails = projectPower.PowerTypeDetails.Select(t => { t.PowerTypeDetailId = 0; t.ProjectPowerId = 0; return t; }).ToList();
                    projectPower.KnowledgeGatheringPlans = projectPower.KnowledgeGatheringPlans.Select(t => { t.KnowledgeGatheringPlanId = 0; t.ProjectPowerId = 0; return t; }).ToList();
                    ProjectPowerUow.RegisterNew<ProjectPower>(projectPower);
                    ProjectPowerUow.Commit();

                    //For feedback
                    var projectPowerModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.Power);
                    var projectPowerModuleId = projectPowerModules != null ? projectPowerModules.ProjectModuleId : 0;
                    var projectPowerReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectPowerModuleId);
                    if (projectPowerReviews != null)
                    {
                        projectPowerReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Power && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectPowerReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectPowerReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                
                #endregion

                #region Game Module
                var projectGame = ProjectUow.Repository<ProjectGameDetail>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.Games).FirstOrDefault();
                if (projectGame != null)
                {
                    projectGame.ProjectGameDetailId = 0;
                    projectGame.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Game && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectGame.Games = projectGame.Games.Select(t => { t.GameId = 0; t.ProjectGameDetailId = 0; return t; }).ToList();
                    ProjectGameUow.RegisterNew<ProjectGameDetail>(projectGame);
                    ProjectGameUow.Commit();

                    //For feedback
                    var projectGameModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.Game);
                    var projectGameModuleId = projectGameModules != null ? projectGameModules.ProjectModuleId : 0;
                    var projectGameReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectGameModuleId);
                    if (projectGameReviews != null)
                    {
                        projectGameReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Game && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectGameReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectGameReviews);
                        ProjectModuleUow.Commit();
                    }
                }

               
                #endregion

                #region Our Negotiables Module
                var ourRequirementDetailsId = new Dictionary<int,int>();
                var ourNegotiables = ProjectUow.Repository<ProjectRequirement>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.OurRequirementDetails, p => p.Ourbatnas).FirstOrDefault();
                
                if (ourNegotiables != null)
                {
                    var oldourNegotiableId = ourNegotiables.ProjectRequirementId;
                    var oldOurRequirmentDetails = ourNegotiables.OurRequirementDetails;
                    ourNegotiables.ProjectRequirementId = 0;
                    ourNegotiables.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.OurRequirement && t.ProjectId == project.ProjectId).ProjectModuleId;
                    //ourNegotiables.OurRequirementDetails = ourNegotiables.OurRequirementDetails.Select(t => { t.OurRequirementDetailId = 0; t.ProjectRequirementId = 0;t.ProjectModuleId = ourNegotiables.ProjectModuleId; return t; }).ToList();
                    ourNegotiables.OurRequirementDetails = null;
                    ourNegotiables.Ourbatnas = ourNegotiables.Ourbatnas.Select(t => { t.OurbatnaId = 0; t.ProjectRequirementId = 0; return t; }).ToList();
                    ProjectRequirementUow.RegisterNew<ProjectRequirement>(ourNegotiables);
                    ProjectRequirementUow.Commit();

                    foreach (var item in oldOurRequirmentDetails)
                    {
                        var zoma = ProjectUow.Repository<ProjectZoma>().FirstOrDefault(t => t.OurRequirementDetailId == item.OurRequirementDetailId);
                        item.OurRequirementDetailId = 0;
                        item.ProjectRequirementId = ourNegotiables.ProjectRequirementId;
                        item.ProjectModuleId = ourNegotiables.ProjectModuleId;
                        ProjectRequirementUow.RegisterNew<OurRequirementDetail>(item);
                        ProjectRequirementUow.Commit();

                        if(zoma != null)
                        {
                            ourRequirementDetailsId.Add( zoma.ProjectZomaId, item.OurRequirementDetailId);
                        }
                        


                    }

                    //For feedback
                    var ourNegotiablesModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.OurRequirement);
                    var ourNegotiablesModuleId = ourNegotiablesModules != null ? ourNegotiablesModules.ProjectModuleId : 0;
                    var ourNegotiablesReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == ourNegotiablesModuleId);
                    if (ourNegotiablesReviews != null)
                    {
                        ourNegotiablesReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.OurRequirement && t.ProjectId == project.ProjectId).ProjectModuleId;
                        ourNegotiablesReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(ourNegotiablesReviews);
                        ProjectModuleUow.Commit();
                    }
                }


                #endregion

                #region Their Negotiables Module

                var projectTheirNegotiableModules = projectModulesDb.FirstOrDefault(t => t.TemplateModuleId == (int)ModuleName.TheirRequirement);
                var projectTheirNegotiableModuleId = projectTheirNegotiableModules != null ? projectTheirNegotiableModules.ProjectModuleId : 0;
                var theirNegotiables = ProjectUow.Repository<ProjectRequirement>().
                    FindByInclude(t => t.ProjectModuleId == projectTheirNegotiableModuleId, i => i.TheirRequirementDetails, p => p.TheirBatnas).FirstOrDefault();
              
                if (theirNegotiables != null)
                {
                    var oldNegotiableId = theirNegotiables != null ? theirNegotiables.ProjectRequirementId : 0;
                    var theirRequirementDetails = theirNegotiables.TheirRequirementDetails;
                    theirNegotiables.ProjectRequirementId = 0;
                    theirNegotiables.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.TheirRequirement && t.ProjectId == project.ProjectId).ProjectModuleId;
                    //theirNegotiables.TheirRequirementDetails = theirNegotiables.TheirRequirementDetails.Select(t => { t.TheirRequirementDetailId = 0; t.ProjectRequirementId = 0; return t; }).ToList();
                    theirNegotiables.TheirRequirementDetails = null;
                    theirNegotiables.TheirBatnas = theirNegotiables.TheirBatnas.Select(t => { t.TheirBatnaId = 0; t.ProjectRequirementId = 0; return t; }).ToList();
                    ProjectRequirementUow.RegisterNew<ProjectRequirement>(theirNegotiables);
                    ProjectRequirementUow.Commit();
                    var zomaDetails = ProjectUow.Repository<ProjectZoma>().FindBy(t => t.ProjectModuleId == projectTheirNegotiableModuleId).ToList();

                    foreach (var item in theirRequirementDetails)
                    {
                        item.TheirRequirementDetailId = 0;
                        item.ProjectRequirementId = theirNegotiables.ProjectRequirementId;
                        ProjectRequirementUow.RegisterNew<TheirRequirementDetail>(item);
                        ProjectRequirementUow.Commit();
                        if (zomaDetails.Count > 0)
                        {
                            var zomaData = zomaDetails.Find(t => t.TheirRequirementDetailId == item.TheirRequirementDetailId); 
                            if (zomaData != null)
                            {
                                var data = ourRequirementDetailsId.First(t => t.Key == zomaData.ProjectZomaId);
                                zomaData.OurRequirementDetailId = data.Value;
                                zomaData.ProjectModuleId = theirNegotiables.ProjectModuleId;
                                zomaData.TheirRequirementDetailId = item.TheirRequirementDetailId;
                                zomaData.ProjectZomaId = 0;
                                ProjectRequirementUow.RegisterNew<ProjectZoma>(zomaData);
                                ProjectRequirementUow.Commit();

                            }
                        }
                    }

                    //For feedback
                    var thisNegotiablesModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.TheirRequirement);
                    var thisNegotiablesModuleId = thisNegotiablesModules != null ? thisNegotiablesModules.ProjectModuleId : 0;
                    var thisNegotiablesReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == thisNegotiablesModuleId);
                    if (thisNegotiablesReviews != null)
                    {
                        thisNegotiablesReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.TheirRequirement && t.ProjectId == project.ProjectId).ProjectModuleId;
                        thisNegotiablesReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(thisNegotiablesReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                //var zomaDetails = projectModulesDb.First(t => t.TemplateModuleId == 46).ProjectModuleId;


                //var zomaModule = projectModules.FirstOrDefault(t => t.TemplateModuleId == 46);
                //if (zomaModule != null)
                //{
                //    var zomaModuleId = zomaModule.ProjectModuleId;
                //    var zoma = ProjectUow.Repository<ProjectZoma>().FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId).ToList();
                //    foreach (var item in zoma)
                //    {
                //        item.ProjectZomaId = 0;
                //        item.ProjectModuleId = zomaModuleId;
                //        var ourRequirement = ProjectUow.Repository<OurRequirementDetail>().FindBy(t => t.OurRequirementDetailId == item.OurRequirementDetailId).ToList();
                //        foreach (var data in ourRequirement)
                //        {
                //            data.OurRequirementDetailId = 0;
                //            data.ProjectRequirementId = theirNegotiables.ProjectRequirementId;
                //            ProjectUow.RegisterNew<OurRequirementDetail>(data);
                //            ProjectUow.Commit();
                //        }
                //        //ourRequirement = ourRequirement.Select(t => { t.OurRequirementDetailId = 0; t.ProjectRequirementId = theirNegotiables.ProjectRequirementId; return t; }).ToList();
                //        var theirRequirment = ProjectUow.Repository<TheirRequirementDetail>().FindBy(t => t.ProjectRequirementId == oldNegotiableId).ToList();
                //        foreach (var dataReq in theirRequirment)
                //        {
                //            dataReq.TheirRequirementDetailId = 0;
                //            dataReq.ProjectRequirementId = theirNegotiables.ProjectRequirementId;
                //            ProjectUow.RegisterNew<TheirRequirementDetail>(dataReq);
                //            ProjectUow.Commit();
                //        }
                //        item.OurRequirementDetail = ourRequirement.FirstOrDefault();
                //        item.TheirRequirementDetail = theirRequirment.FirstOrDefault();
                //        //theirRequirment = theirRequirment.Select(t => { t.TheirRequirementDetailId = 0; t.ProjectRequirementId = theirNegotiables.ProjectRequirementId; return t; }).ToList();
                //        ProjectUow.RegisterNew<ProjectZoma>(item);
                //        ProjectUow.Commit();
                //    }
                //}

                #endregion


                #region Project Culture Plan Module


                var projectCulturePlanModule = projectModulesDb.FirstOrDefault(t => t.TemplateModuleId == (int)ModuleName.CulturePlan && t.ProjectId == projectId);
                if (projectCulturePlanModule != null)
                {
                    var newModuleId = projectModules.Find(t => t.TemplateModuleId == 47).ProjectModuleId;
                    var projectCulturePlan = ProjectCulturePlanUow.Repository<ProjectCulturePlan>().
                  FindByInclude(t => t.ProjectModuleId == projectCulturePlanModule.ProjectModuleId).ToList();
                    foreach (var item in projectCulturePlan)
                    {
                        item.ProjectCulturePlanId = 0;
                        item.ProjectModuleId = newModuleId;
                        ProjectCulturePlanUow.RegisterNew<ProjectCulturePlan>(item);
                        ProjectCulturePlanUow.Commit();
                    }

                    
                    //For feedback
                    var projectCulturePlanReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectCulturePlanModule.ProjectModuleId);
                    if (projectCulturePlanReviews != null)
                    {
                        projectCulturePlanReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.CulturePlan && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectCulturePlanReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectCulturePlanReviews);
                        ProjectModuleUow.Commit();
                    }
                }
                




                #endregion

                #region Project Preparation

                var projectPreparation = ProjectUow.Repository<ProjectPreparation>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.CommunicationPlans, p => p.EventPlanningActions).FirstOrDefault();
                if (projectPreparation != null)
                {
                    projectPreparation.ProjectPreparationId = 0;
                    projectPreparation.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Preparation && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectPreparation.CommunicationPlans = projectPreparation.CommunicationPlans.Select(t => { t.CommunicationPlanId = 0; t.ProjectPreparationId = 0; return t; }).ToList();
                    projectPreparation.EventPlanningActions = projectPreparation.EventPlanningActions.Select(t => { t.EventPlanningActionId = 0; t.ProjectPreparationId = 0; return t; }).ToList();
                    ProjectPreparationUow.RegisterNew<ProjectPreparation>(projectPreparation);
                    ProjectPreparationUow.Commit();

                    //for feedback
                    var projectPreparationModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.Preparation);
                    var projectPreparationModuleId = projectPreparationModules != null ? projectPreparationModules.ProjectModuleId : 0;
                    var tprojectPreparationReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectPreparationModuleId);
                    if (tprojectPreparationReviews != null)
                    {
                        tprojectPreparationReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.Preparation && t.ProjectId == project.ProjectId).ProjectModuleId;
                        tprojectPreparationReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(tprojectPreparationReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                
                #endregion

                #region Event Timeline

                var projectEventTimeline = ProjectUow.Repository<ProjectEventTimeline>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.ArrivalAndOpeningTactics, p => p.EventAgendaTimings).FirstOrDefault();
                if (projectEventTimeline != null)
                {
                    projectEventTimeline.ProjectEventTimelineId = 0;
                    projectEventTimeline.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.EventTimeline  && t.ProjectId == project.ProjectId).ProjectModuleId;
                    projectEventTimeline.ArrivalAndOpeningTactics = projectEventTimeline.ArrivalAndOpeningTactics.Select(t => { t.ArrivalAndOpeningTacticId = 0; t.ProjectEventTimelineId = 0; return t; }).ToList();
                    projectEventTimeline.EventAgendaTimings = projectEventTimeline.EventAgendaTimings.Select(t => { t.EventAgendaTimingId = 0; t.ProjectEventTimelineId = 0; return t; }).ToList();
                    ProjectEventTimelineUow.RegisterNew<ProjectEventTimeline>(projectEventTimeline);
                    ProjectEventTimelineUow.Commit();

                    //For feedback
                    var projectEventTimelineModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.EventTimeline);
                    var projectEventTimelineModuleId = projectEventTimelineModules != null ? projectEventTimelineModules.ProjectModuleId : 0;
                    var projectEventTimelineReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectEventTimelineModuleId);
                    if (projectEventTimelineReviews != null)
                    {
                        projectEventTimelineReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.EventTimeline && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectEventTimelineReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectEventTimelineReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                
                #endregion


                #region Post Event Actions Module


                var postEventModule = projectModulesDb.FirstOrDefault(t => t.TemplateModuleId == (int)ModuleName.PostEventAction && t.ProjectId == projectId);
                if (postEventModule != null)
                {
                    var postEventModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.PostEventAction).ProjectModuleId;
                    var projectImplementation = ProjectModuleUow.Repository<ProjectImplementationPlan>().
                                      FindByInclude(t => t.ProjectModuleId == postEventModule.ProjectModuleId).ToList();
                    foreach (var item in projectImplementation)
                    {
                        item.ProjectImplementationPlanId = 0;
                        item.ProjectModuleId = postEventModuleId;
                        ProjectModuleUow.RegisterNew<ProjectImplementationPlan>(item);
                        ProjectModuleUow.Commit();
                    }
                    var projectPostEventAction = ProjectModuleUow.Repository<ProjectPostEventAction>().
                                      FindByInclude(t => t.ProjectModuleId == postEventModule.ProjectModuleId).ToList();
                    foreach (var item in projectPostEventAction)
                    {
                        item.ProjectModuleId = postEventModuleId;
                        item.ProjectPostEventActionId = 0;
                        ProjectModuleUow.RegisterNew<ProjectPostEventAction>(item);
                        ProjectModuleUow.Commit();
                    }

                    var projectCarryForward = ProjectModuleUow.Repository<ProjectCarryForward>().
                     FindByInclude(t => t.ProjectModuleId == postEventModule.ProjectModuleId).ToList();
                    foreach (var item in projectCarryForward)
                    {
                        item.ProjectModuleId = postEventModuleId;
                        item.ProjectCarryForwardId = 0;
                        ProjectModuleUow.RegisterNew<ProjectCarryForward>(item);
                        ProjectModuleUow.Commit();
                    }

                    //For feedback
                    var postEventActionModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.PostEventAction);
                    var postEventActionModuleId = postEventActionModules != null ? postEventActionModules.ProjectModuleId : 0;
                    var postEventActionReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == postEventActionModuleId);
                    if (postEventActionReviews != null)
                    {
                        postEventActionReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.PostEventAction && t.ProjectId == project.ProjectId).ProjectModuleId;
                        postEventActionReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(postEventActionReviews);
                        ProjectModuleUow.Commit();
                    }
                }


                #endregion

                #region Project Outcoming and Learning Module
                var projectOutcomeLearning = projectModulesDb.FirstOrDefault(t => t.TemplateModuleId == (int)ModuleName.OutcomeAndLearning && t.ProjectId == projectId);

                if (projectOutcomeLearning != null)
                {
                    var projectOutcomeLearningModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.OutcomeAndLearning).ProjectModuleId;
                    var projectOutcomingAndLearning = ProjectUow.Repository<ProjectOutcomeAndLearning>().
                    FindByInclude(t => t.ProjectModuleId == projectOutcomeLearning.ProjectModuleId).ToList();
                    foreach (var item in projectOutcomingAndLearning)
                    {
                        item.ProjectOutcomeAndLearningId = 0;
                        item.ProjectModuleId = projectOutcomeLearningModuleId;
                        ProjectUow.RegisterNew<ProjectOutcomeAndLearning>(item);
                        ProjectUow.Commit();
                    }
                    
                    //for feedback
                    var projectOutcomeLearningReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == projectOutcomeLearning.ProjectModuleId);
                    if (projectOutcomeLearningReviews != null)
                    {
                        projectOutcomeLearningReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.OutcomeAndLearning && t.ProjectId == project.ProjectId).ProjectModuleId;
                        projectOutcomeLearningReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(projectOutcomeLearningReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                #endregion


                #region NanoScopeToNegotiateObjective Module

                var nanoScopeToNegotiateObjective = ProjectUow.Repository<NanoScopeToNegotiateObjective>().
                    FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.NanoOurObjectives, p => p.NanoScopeToNegotiateCommunicationModes).FirstOrDefault();
                if (nanoScopeToNegotiateObjective != null)
                {
                    nanoScopeToNegotiateObjective.NanoScopeToNegotiateObjectiveId = 0;
                    nanoScopeToNegotiateObjective.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.ScopetoNegotiateandObjectives && t.ProjectId == project.ProjectId).ProjectModuleId;
                    nanoScopeToNegotiateObjective.NanoOurObjectives = nanoScopeToNegotiateObjective.NanoOurObjectives.Select(t => { t.NanoOurObjectiveId = 0; t.NanoScopeToNegotiateObjectiveId = 0; return t; }).ToList();
                    nanoScopeToNegotiateObjective.NanoScopeToNegotiateCommunicationModes = nanoScopeToNegotiateObjective.NanoScopeToNegotiateCommunicationModes.Select(t => { t.NanoScopeToNegotiateCommunicationModeId = 0; t.NanoScopeToNegotiateObjectiveId = 0; return t; }).ToList();
                    NanoScopeToNegotiateObjectiveUow.RegisterNew<NanoScopeToNegotiateObjective>(nanoScopeToNegotiateObjective);
                    NanoScopeToNegotiateObjectiveUow.Commit();


                    //for feedback
                    var nanoScopeToNegotiateObjectiveModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.ScopetoNegotiateandObjectives);
                    var nanoScopeToNegotiateObjectiveModuleId = nanoScopeToNegotiateObjectiveModules != null ? nanoScopeToNegotiateObjectiveModules.ProjectModuleId : 0;
                    var nanoScopeToNegotiateObjectiveReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == nanoScopeToNegotiateObjectiveModuleId);
                    if (nanoScopeToNegotiateObjectiveReviews != null)
                    {
                        nanoScopeToNegotiateObjectiveReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.ScopetoNegotiateandObjectives && t.ProjectId == project.ProjectId).ProjectModuleId;
                        nanoScopeToNegotiateObjectiveReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(nanoScopeToNegotiateObjectiveReviews);
                        ProjectModuleUow.Commit();
                    }
                }
                
                #endregion


                #region NegotitationPlan Module

                var projectModuleFornegotiation = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.NegotiationPlan);
                if (projectModuleFornegotiation != null)
                {
                    var negotationPlanModuleId = projectModuleFornegotiation.ProjectModuleId;
                    var oldNegotiationPlan = projectModulesDb.FirstOrDefault(t => t.TemplateModuleId == 55);
                    var nanoProjectNegotiable = ProjectUow.Repository<NanoProjectNegotiable>().FindBy(t => t.ProjectModuleId == oldNegotiationPlan.ProjectModuleId);

                    foreach (var item in nanoProjectNegotiable)
                    {
                        item.NanoProjectNegotiableId = 0;
                        item.ProjectModuleId = negotationPlanModuleId;
                        ProjectUow.RegisterNew<NanoProjectNegotiable>(item);
                        ProjectUow.Commit();
                    }

                    var nanoOurBatna = ProjectUow.Repository<NanoOurBatna>().
                 FindByInclude(t => t.ProjectModuleId == oldNegotiationPlan.ProjectModuleId && t.ProjectModule.Project.ProjectId == projectId).ToList();
                    foreach (var item in nanoOurBatna)
                    {
                        item.NanoOurBatnaId = 0;
                        item.ProjectModuleId = negotationPlanModuleId;
                        ProjectUow.RegisterNew<NanoOurBatna>(item);
                        ProjectUow.Commit();
                    }

                    var nanoTheirBatna = ProjectUow.Repository<NanoTheirBatna>().
                     FindByInclude(t => t.ProjectModuleId == oldNegotiationPlan.ProjectModuleId).ToList();
                    foreach (var item in nanoTheirBatna)
                    {
                        item.NanoTheirBatnaId = 0;
                        item.ProjectModuleId = negotationPlanModuleId;
                        ProjectUow.RegisterNew<NanoTheirBatna>(item);
                        ProjectUow.Commit();
                    }

                    var nanoDiscussionSequence = ProjectUow.Repository<NanoDiscussionSequence>().
                     FindByInclude(t => t.ProjectModuleId == oldNegotiationPlan.ProjectModuleId).ToList();
                    foreach (var item in nanoDiscussionSequence)
                    {
                        item.NanoDiscussionSequenceId = 0;
                        item.ProjectModuleId = negotationPlanModuleId;
                        ProjectUow.RegisterNew<NanoDiscussionSequence>(item);
                        ProjectUow.Commit();
                    }

                    //For feedback
                    var negotiationPlanReview = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == oldNegotiationPlan.ProjectModuleId);
                    if (negotiationPlanReview != null)
                    {
                        negotiationPlanReview.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.NegotiationPlan && t.ProjectId == project.ProjectId).ProjectModuleId;
                        negotiationPlanReview.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(negotiationPlanReview);
                        ProjectModuleUow.Commit();
                    }
                }

                #endregion



                #region Lite Background To Negotiation Module

                var liteBackgroundNegotiation = ProjectUow.Repository<LiteProjectBackground>()
                    .FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.LiteBackgroundCommunicationModes, p => p.LiteTheirTeamMembers, o => o.LiteTargets, d => d.LiteOurTeamMembers).FirstOrDefault();
                if (liteBackgroundNegotiation != null)
                {
                    liteBackgroundNegotiation.LiteProjectBackgroundId = 0;
                    liteBackgroundNegotiation.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.BackgroundToTheNegotiation && t.ProjectId == project.ProjectId).ProjectModuleId;
                    liteBackgroundNegotiation.LiteBackgroundCommunicationModes = liteBackgroundNegotiation.LiteBackgroundCommunicationModes.
                                                        Select(t => { t.LiteBackgroundCommunicationModeId = 0; t.LiteProjectBackgroundId = 0; return t; }).ToList();

                    liteBackgroundNegotiation.LiteTheirTeamMembers = liteBackgroundNegotiation.LiteTheirTeamMembers.
                                                        Select(t => { t.LiteTheirTeamMemberId = 0; t.LiteProjectBackgroundId = 0; return t; }).ToList();

                    liteBackgroundNegotiation.LiteTargets = liteBackgroundNegotiation.LiteTargets.
                                                       Select(t => { t.LiteTargetId = 0; t.LiteProjectBackgroundId = 0; return t; }).ToList();

                    liteBackgroundNegotiation.LiteOurTeamMembers = liteBackgroundNegotiation.LiteOurTeamMembers.
                                                       Select(t => { t.LiteOurTeamMemberId = 0; t.LiteProjectBackgroundId = 0; return t; }).ToList();

                    ProjectUow.RegisterNew<LiteProjectBackground>(liteBackgroundNegotiation);
                    ProjectUow.Commit();

                    //For feedback
                    var liteBackgroundNegotiationModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.BackgroundToTheNegotiation);
                    var liteBackgroundNegotiationModuleId = liteBackgroundNegotiationModules != null ? liteBackgroundNegotiationModules.ProjectModuleId : 0;
                    var liteBackgroundNegotiationReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == liteBackgroundNegotiationModuleId);
                    if (liteBackgroundNegotiationReviews != null)
                    {
                        liteBackgroundNegotiationReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.BackgroundToTheNegotiation && t.ProjectId == project.ProjectId).ProjectModuleId;
                        liteBackgroundNegotiationReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(liteBackgroundNegotiationReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                
                #endregion

                #region Meeting Management Module

                var meetingManagement = ProjectUow.Repository<LiteMeetingManagement>().
                   FindByInclude(t => t.ProjectModule.Project.ProjectId == projectId, i => i.LiteMeetingManagementTimings
                    , p => p.LiteEventPlanningActions, o => o.LiteMeetingPlannings).FirstOrDefault();
                if (meetingManagement != null)
                {
                    meetingManagement.LiteMeetingManagementId = 0;
                    meetingManagement.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.MeetingManagement && t.ProjectId == project.ProjectId).ProjectModuleId;
                    meetingManagement.LiteMeetingManagementTimings = meetingManagement.LiteMeetingManagementTimings.Select(t => { t.LiteMeetingManagementTimingId = 0; t.LiteMeetingManagementId = 0; return t; }).ToList();
                    meetingManagement.LiteEventPlanningActions = meetingManagement.LiteEventPlanningActions.Select(t => { t.LiteEventPlanningActionId = 0; t.LiteMeetingManagementId = 0; return t; }).ToList();
                    meetingManagement.LiteMeetingPlannings = meetingManagement.LiteMeetingPlannings.Select(t => { t.LiteMeetingPlanningId = 0; t.LiteMeetingManagementId = 0; return t; }).ToList();
                    ProjectUow.RegisterNew<LiteMeetingManagement>(meetingManagement);
                    ProjectUow.Commit();

                    //For feedback
                    var meetingManagementModules = projectModulesDb.First(t => t.TemplateModuleId == (int)ModuleName.MeetingManagement);
                    var meetingManagementModuleId = meetingManagementModules != null ? meetingManagementModules.ProjectModuleId : 0;
                    var meetingManagementReviews = ProjectModuleUow.Repository<ProjectModuleReview>().FirstOrDefault(t => t.ProjectModuleId == meetingManagementModuleId);
                    if (meetingManagementReviews != null)
                    {
                        meetingManagementReviews.ProjectModuleId = projectModules.Find(t => t.TemplateModuleId == (int)ModuleName.MeetingManagement && t.ProjectId == project.ProjectId).ProjectModuleId;
                        meetingManagementReviews.ProjectModuleReviewId = 0;
                        ProjectModuleUow.RegisterNew<ProjectModuleReview>(meetingManagementReviews);
                        ProjectModuleUow.Commit();
                    }
                }

                
                #endregion

                int templateTypeId = 0;

                if (project.TemplateGroupId == new Guid("61242C59-D4AF-4C81-BA1F-637302ED3486"))
                {
                    templateTypeId = 1;
                }
                else if (project.TemplateGroupId == new Guid("8FE14800-9591-443F-AEC3-213614DF7AD0"))
                {
                    templateTypeId = 2;
                }
                else if (project.TemplateGroupId == new Guid("22041B4D-9B17-40DA-8D44-156D23B59A9E"))
                {
                    templateTypeId = 3;
                }

                AddRecentActivityAndNotification(project, templateTypeId, true);

                return project.ProjectId;
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }

        public int CloseProject(int ProjectId)
        {
            var project = ProjectUow.Repository<Project>().SingleOrDefault(t => t.ProjectId == ProjectId);
            project.IsClosed = true;
            ProjectUow.RegisterDirty<Project>(project);
            ProjectUow.Commit();
            return project.ProjectId;
        }

        public int CollabaratorsOrReviewersInAllModules(CollabaratorsOrReviewersInAllModules collabaratorsOrReviewersInAllModules)
        {
            try
            {
                List<ProjectModuleAssigneesOrReviewer> projectModuleAssigneesOrReviewers = ProjectUow.Repository<ProjectModuleAssigneesOrReviewer>().All()
                    .Where(c => c.ProjectId == collabaratorsOrReviewersInAllModules.ProjectId).ToList();

                List<int> projectModuleIds = ProjectUow.Repository<DbEntities.Models.ProjectModule>().FindBy(x => x.ProjectId == collabaratorsOrReviewersInAllModules.ProjectId).Select(c => c.ProjectModuleId).ToList();

                List<ProjectModuleAssignee> projectModuleAssignees = ProjectUow.Repository<ProjectModuleAssignee>().All().Where(c => projectModuleIds.Contains(c.ProjectModuleId)).ToList();

                List<ProjectModuleReviewer> projectModuleReviewers = ProjectUow.Repository<ProjectModuleReviewer>().All().Where(c => projectModuleIds.Contains(c.ProjectModuleId)).ToList();

                if (collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers.Count() > 0)
                {
                    // Adding Assignees/Collaborators in list of Project Modules
                    if (collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers.Where(c => c.IsAssignee).Count() > 0)
                    {
                        foreach (var projectModuleId in projectModuleIds)
                        {
                            foreach (var projectModuleAssigneesOrReviewer in collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers.Where(c => c.IsAssignee).ToList())
                            {
                                if (projectModuleAssignees.Where(c => c.ProjectModuleId == projectModuleId && c.UserId == projectModuleAssigneesOrReviewer.UserId).Count() == 0)
                                {
                                    ProjectModuleAssignee projectModuleAssignee = new ProjectModuleAssignee()
                                    {
                                        ProjectModuleId = projectModuleId,
                                        UserId = projectModuleAssigneesOrReviewer.UserId
                                    };

                                    ProjectModuleUow.RegisterNew<ProjectModuleAssignee>(projectModuleAssignee);
                                }
                            }
                        }
                    }

                    // Adding reviewers in list of Project Modules
                    if (collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers.Where(c => c.IsReviewer).Count() > 0)
                    {
                        foreach (var projectModuleId in projectModuleIds)
                        {
                            foreach (var projectModuleAssigneesOrReviewer in collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers.Where(c => c.IsReviewer).ToList())
                            {
                                if (projectModuleReviewers.Where(c => c.ProjectModuleId == projectModuleId && c.UserId == projectModuleAssigneesOrReviewer.UserId).Count() == 0)
                                {
                                    ProjectModuleReviewer projectModuleReviewer = new ProjectModuleReviewer()
                                    {
                                        ProjectModuleId = projectModuleId,
                                        UserId = projectModuleAssigneesOrReviewer.UserId
                                    };

                                    ProjectModuleUow.RegisterNew<ProjectModuleReviewer>(projectModuleReviewer);
                                }
                            }
                        }
                    }

                    // Deleting the list of user who were just removed from UI.
                    foreach (var item in projectModuleAssigneesOrReviewers.Where(c => !collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers
                        .Any(t => t.ProjectModuleAssigneesOrReviewerId == c.ProjectModuleAssigneesOrReviewerId && t.ProjectModuleAssigneesOrReviewerId != 0)).ToList())
                    {
                        ProjectUow.RegisterDeleted<ProjectModuleAssigneesOrReviewer>(item);
                    }

                    // Inserting new users who were just added from UI
                    foreach (var item in collabaratorsOrReviewersInAllModules.ProjectModuleAssigneesOrReviewers)
                    {
                        if (item.ProjectModuleAssigneesOrReviewerId == 0)
                        {
                            ProjectUow.RegisterNew<ProjectModuleAssigneesOrReviewer>(item);
                        }
                    }
                }
                else
                {
                    // Deleting all list of users if there are no any users from UI.
                    foreach (var item in projectModuleAssigneesOrReviewers)
                    {
                        ProjectUow.RegisterDeleted<ProjectModuleAssigneesOrReviewer>(item);
                    }
                }

                ProjectModuleUow.Commit();
                ProjectUow.Commit();

                return collabaratorsOrReviewersInAllModules.ProjectId;
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }

        #region Private properties
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        private IExportReportPDFDomain ExportReportPDFDomain { get; set; }

        private IProjectUow ProjectUow { get; set; }

        private IProjectLearningUow ProjectLearningUow { get; set; }

        public ILiteMeetingManagementUow LiteMeetingManagementUow { get; set; }

        public ILiteProjectBackgroundUow LiteProjectBackgroundUow { get; set; }

        private IProjectModuleUow ProjectModuleUow { get; set; }

        private IProjectNegotiationUow ProjectNegotiationUow { get; set; }

        private INanoScopeToNegotiateObjectiveUow NanoScopeToNegotiateObjectiveUow { get; set; }

        private IProjectBackgroundUow ProjectBackgroundUow { get; set; }

        private IProjectEventTimelineUow ProjectEventTimelineUow { get; set; }

        private IProjectCultureUow ProjectCultureUow { get; set; }

        private IProjectGameUow ProjectGameUow { get; set; }

        private IProjectNegotionalityUow ProjectNegotionalityUow { get; set; }

        private IProjectPowerUow ProjectPowerUow { get; set; }

        private IProjectPreparationUow ProjectPreparationUow { get; set; }

        private IProjectRequirementUow ProjectRequirementUow { get; set; }

        private IProjectStakeholderUow ProjectStakeholderUow { get; set; }

        private IExportReportUow ExportReportUow { get; set; }

        private IUserUow UserUow { get; set; }

        private IScheduleEmailUow ScheduleEmailUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private ServerSetting serverSetting { get; set; }

        private IProjectCulturePlanUow ProjectCulturePlanUow { get; set; }

        //private IProjectPostEventActionUow ProjectPostEventActionUow { get; set; }

        
        #endregion
    }
    public interface IProjectDomain
    {
        HashSet<string> AddValidation(Project project);

        HashSet<string> UpdateValidation(Project project);

        HashSet<string> DeleteValidation(int id);

        Project Add(Project project, int templateTypeId);

        Project Update(Project project, int templateTypeId);

        string GetUrl(int projectModuleId);

        void Delete(int id);

        int CreateCopy(int projectId);

        int CloseProject(int projectId);

        int CollabaratorsOrReviewersInAllModules(CollabaratorsOrReviewersInAllModules collabaratorsOrReviewersInAllModules);
    }
}
