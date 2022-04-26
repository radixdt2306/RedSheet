using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using System;
using System.Linq;
using Rx.Core.Security;

namespace RedSheet.Domain.ProjectModuleModule
{
    public class NanoDiscussionSequenceDomain : INanoDiscussionSequenceDomain
    {
        public NanoDiscussionSequenceDomain(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility, IProjectUow projectUow, IRecentActivityAndNotificationUow recentActivityAndNotificationUow)
        {
            ProjectModuleUow = projectModuleUow;
            ProjectUow = projectUow;
            RecentActivityAndNotificationUow = recentActivityAndNotificationUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
        }

        public IEnumerable<vNanoDiscussionSequence> Get(int projectModuleId) => ProjectModuleUow.Repository<vNanoDiscussionSequence>().FindBy(t => t.ProjectModuleId == projectModuleId);

        public vNanoDiscussionSequenceRecord Get(int projectModuleId, int id) => ProjectModuleUow.Repository<vNanoDiscussionSequenceRecord>().SingleOrDefault(t => t.NanoDiscussionSequenceId == id);

        public HashSet<string> AddValidation(NanoDiscussionSequence nanoDiscussionSequence)
        {
            var checkSortOrder = ProjectModuleUow.Repository<NanoDiscussionSequence>().FirstOrDefault(t => t.SortOrder == nanoDiscussionSequence.SortOrder && t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId && t.NegotiationPhaseId == nanoDiscussionSequence.NegotiationPhaseId || (TimeSpan.Compare(t.Time, nanoDiscussionSequence.Time) == 0 && t.NegotiationPhaseId == nanoDiscussionSequence.NegotiationPhaseId && t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId));
            if (checkSortOrder != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(nanoDiscussionSequence);
            return ValidationMessages;
        }

        public NanoDiscussionSequence Add(NanoDiscussionSequence nanoDiscussionSequence)
        {
            ProjectModuleUow.RegisterNew<NanoDiscussionSequence>(nanoDiscussionSequence);
            ProjectModuleUow.Commit();
            var moduleData = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId);

            string RecentActivityAndNotificationName = string.Empty;
            if (moduleData.TemplateModuleId == 41 || moduleData.TemplateModuleId == 45 || moduleData.TemplateModuleId == 46)
            {
                RecentActivityAndNotificationName = "<span>"+moduleData.TemplateModuleName + "<i class='sup color-blue-gray fa fa-registered'></i> Of " + (ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == moduleData.ProjectId).ProjectName) + " is filled by " + (ProjectModuleUow.Repository<User>().FirstOrDefault(t => t.UserId == UserClaim.UserId).FirstName) + "</span>";
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
                ProjectModuleId = nanoDiscussionSequence.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == (ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId).ProjectId)).OwnerId;
            var count = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(nanoDiscussionSequence.ProjectModuleId);
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
                    ProjectModuleId = nanoDiscussionSequence.ProjectModuleId,
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
                var notificationUpdate = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                RecentActivityAndNotificationUow.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                RecentActivityAndNotificationUow.Commit();
            }
            return nanoDiscussionSequence;
        }
        public HashSet<string> UpdateValidation(NanoDiscussionSequence nanoDiscussionSequence)
        {
            var checkSortOrder = ProjectModuleUow.Repository<NanoDiscussionSequence>().FirstOrDefault(t => t.Time == nanoDiscussionSequence.Time && t.SortOrder == nanoDiscussionSequence.SortOrder && t.NegotiationPhaseId == nanoDiscussionSequence.NegotiationPhaseId && t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId && t.NanoDiscussionSequenceId != nanoDiscussionSequence.NanoDiscussionSequenceId || (TimeSpan.Compare(t.Time, nanoDiscussionSequence.Time) == 0 && t.NegotiationPhaseId == nanoDiscussionSequence.NegotiationPhaseId && t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId && t.NanoDiscussionSequenceId != nanoDiscussionSequence.NanoDiscussionSequenceId));
            if (checkSortOrder != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            CommonValidation(nanoDiscussionSequence);
            return ValidationMessages;
        }

        public NanoDiscussionSequence Update(NanoDiscussionSequence nanoDiscussionSequence)
        {
            ProjectModuleUow.RegisterDirty<NanoDiscussionSequence>(nanoDiscussionSequence);
            ProjectModuleUow.Commit();
            var moduleData = ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(t => t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId);

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
                ProjectModuleId = nanoDiscussionSequence.ProjectModuleId,
                RecentActivityAndNotificationName = RecentActivityAndNotificationName,
                TemplateModuleId = moduleData.TemplateModuleId,
                TemplateModuleName = moduleData.TemplateModuleName,
                UpdatedBy = UserClaim.UserId,
                UpdatedOn = DateTime.Now,
                URL = "",
                UserId = UserClaim.UserId,
            };
            ApplicationUtility.RecentActivityPost(recentActivity);
            var ownerId = ProjectUow.Repository<Project>().FirstOrDefault(t => t.ProjectId == (ProjectModuleUow.Repository<RedSheet.DbEntities.Models.ProjectModule>().FirstOrDefault(x => x.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId).ProjectId)).OwnerId;
            var count = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().Count(t => t.IsNotification == true && t.UserId == ownerId && t.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId);
            var Url = ApplicationUtility.GetUrl(nanoDiscussionSequence.ProjectModuleId);
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
                    ProjectModuleId = nanoDiscussionSequence.ProjectModuleId,
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
                var notificationUpdate = RecentActivityAndNotificationUow.Repository<RecentActivityAndNotification>().FirstOrDefault(x => x.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId && x.UserId == ownerId && x.IsNotification == true);
                notificationUpdate.IsSeen = false;
                notificationUpdate.URL = Url;
                RecentActivityAndNotificationUow.RegisterDirty<RecentActivityAndNotification>(notificationUpdate);
                RecentActivityAndNotificationUow.Commit();
            }
            return nanoDiscussionSequence;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<NanoDiscussionSequence>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var nanoDiscussionSequence = ProjectModuleUow.Repository<NanoDiscussionSequence>().FindByKey(id);
            ProjectModuleUow.RegisterDeleted<NanoDiscussionSequence>(nanoDiscussionSequence);
            ProjectModuleUow.Commit();
        }

        private void CommonValidation(NanoDiscussionSequence nanoDiscussionSequence)
        {

        }

        public int GetMaxSortOrder(NanoDiscussionSequence nanoDiscussionSequence)
        {
            int MaxSortOrder = 0;
            List<NanoDiscussionSequence> lstEvents = ProjectModuleUow.Repository<NanoDiscussionSequence>().FindBy(a => a.NegotiationPhaseId == nanoDiscussionSequence.NegotiationPhaseId && a.ProjectModuleId == nanoDiscussionSequence.ProjectModuleId).ToList();
            if (lstEvents.Count > 0)
                MaxSortOrder = Convert.ToInt32(lstEvents.Max(a => a.SortOrder));
            return MaxSortOrder;

        }

        private IProjectUow ProjectUow { get; set; }

        private IRecentActivityAndNotificationUow RecentActivityAndNotificationUow { get; set; }

        private IProjectModuleUow ProjectModuleUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

    }
    public interface INanoDiscussionSequenceDomain
    {
        IEnumerable<vNanoDiscussionSequence> Get(int projectModuleId);
        vNanoDiscussionSequenceRecord Get(int projectModuleId, int id);
        HashSet<string> AddValidation(NanoDiscussionSequence nanoDiscussionSequence);
        HashSet<string> UpdateValidation(NanoDiscussionSequence nanoDiscussionSequence);
        HashSet<string> DeleteValidation(int id);
        NanoDiscussionSequence Add(NanoDiscussionSequence nanoDiscussionSequence);
        NanoDiscussionSequence Update(NanoDiscussionSequence nanoDiscussionSequence);
        void Delete(int id);
        int GetMaxSortOrder(NanoDiscussionSequence nanoDiscussionSequence);
    }
}
