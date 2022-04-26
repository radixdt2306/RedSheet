using RedSheet.BoundedContext.SqlContext;
using RedSheet.Infrastructure.RequestContext;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using Rx.Core.Security;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlClient;
using System.Linq;
using System;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.DbEntities.Enums;
using Rx.Core.Settings;


namespace RedSheet.Infrastructure.Utilities
{
    public class ApplicationUtility : IApplicationUtility
    {
        private IDbContextManager<MainSqlDbContext> MainDbcontextManager { get; set; }

        private IDbContextManager<AdminSqlDbContext> AdminDbContextManager { get; set; }

        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public IRequestAccessor RequestAccessor { get; set; }

        private IMasterUow MasterUow { get; set; }

        private IUserUow UserUow { get; set; }

        private IScheduleEmailUow ScheduleEmailUow { get; set; }

        private IRecentActivityAndNotificationUow RecentActivityAndNotificationUow { get; set; }

        private ServerSetting ServerSetting { get; set; }

        public ApplicationUtility(IDbContextManager<MainSqlDbContext> mainDbContextManager, IDbContextManager<AdminSqlDbContext> adminDbContextManager, IRequestAccessor requestAccessor, IMasterUow masterUow, IUserUow userUow, ServerSetting serverSetting, IScheduleEmailUow scheduleEmailUow, IRecentActivityAndNotificationUow recentActivityAndNotificationUow, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            MainDbcontextManager = mainDbContextManager;
            AdminDbContextManager = adminDbContextManager;
            DbContextManager = dbContextManager;
            ServerSetting = serverSetting;
            RequestAccessor = requestAccessor;
            MasterUow = masterUow;
            UserUow = userUow;
            ScheduleEmailUow = scheduleEmailUow;
            RecentActivityAndNotificationUow = recentActivityAndNotificationUow;
        }
        public string GetTableName<T>()
        {
            var table = typeof(T).GetCustomAttributes(typeof(TableAttribute), false).SingleOrDefault() as TableAttribute;
            return table != null ? table.Name : string.Empty;
        }

        public bool CandDelete<DbEntity>(int recordId, bool isMainDb)
        {
            var tableName = this.GetTableName<DbEntity>();
            if (!string.IsNullOrEmpty(tableName))
            {
                var spParameters = new object[2];
                spParameters[0] = new SqlParameter() { ParameterName = "TableName", Value = tableName };
                spParameters[1] = new SqlParameter() { ParameterName = "RecordId", Value = recordId };
                IEnumerable<DeleteValidationModel> deleteValidation;
                if (isMainDb)
                    deleteValidation = MainDbcontextManager.SqlQueryAsync<DeleteValidationModel>("EXEC spCanDeleteRecord @TableName, @RecordId", spParameters).Result;
                else
                    deleteValidation = AdminDbContextManager.SqlQueryAsync<DeleteValidationModel>("EXEC spCanDeleteRecord @TableName, @RecordId", spParameters).Result;
                return deleteValidation.SingleOrDefault().Result;
            }
            return false;
        }

        public string GetValidationMessage(ValidationFailedCode validationFailed, bool isMainDb, params string[] replaceTexts)
        {
            int defaultLanguageId = 1;
            var applicationDefaultLanguage = MasterUow.Repository<GlobalSetting>().All().FirstOrDefault();
            if (applicationDefaultLanguage != null)
                defaultLanguageId = applicationDefaultLanguage.LanguageId;
            var currentLanguage = !string.IsNullOrEmpty(UserClaim.LanguageCode) ? Convert.ToInt32(UserClaim.LanguageCode) : defaultLanguageId;
            var languageContentId = Convert.ToInt32(validationFailed);
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "LanguageContentId", Value = languageContentId };
            spParameters[1] = new SqlParameter() { ParameterName = "LanguageId", Value = currentLanguage };
            IEnumerable<ServerMessageModel> result;
            if (isMainDb)
                result = MainDbcontextManager.SqlQueryAsync<ServerMessageModel>("EXEC dbo.spServerMessages @LanguageContentId, @LanguageId", spParameters).Result;
            else
                result = AdminDbContextManager.SqlQueryAsync<ServerMessageModel>("EXEC dbo.spServerMessages @LanguageContentId, @LanguageId", spParameters).Result;
            if (result.Count() > 0)
            {
                var message = result.First().Message;
                return Parse(message, replaceTexts);
            }
            return string.Empty;
        }


        private string Parse(string message, string[] replaceTexts)
        {
            var indexCount = 0;
            foreach (var text in replaceTexts)
            {
                message = message.Replace("{" + indexCount + "}", text);
            }
            return message;
        }


        public void scheduleEmailPost(int userId, Project project, int noOfDays, string EmailTemplateName)
        {
            ScheduleEmail scheduleEmail = new ScheduleEmail();
            scheduleEmail.EmailTemplateName = EmailTemplateName;
            scheduleEmail.EmailTo = UserUow.Repository<User>().SingleOrDefault(t => t.UserId == userId && t.StatusId != Status.Deleted).Email;
            //scheduleEmail.EmailFrom = UserUow.Repository<User>().SingleOrDefault(t => t.UserId == project.OwnerId && t.StatusId != Status.Deleted).Email;
            scheduleEmail.EmailFrom = ServerSetting.Get<string>("emailSettings.fromAddress");
            scheduleEmail.InactivityDays = noOfDays;
            scheduleEmail.IsSentScheduleEmail = false;
            scheduleEmail.ProjectName = project.ProjectName;
            scheduleEmail.RequestedDateTime = DateTime.Now;
            scheduleEmail.ProjectId = project.ProjectId;
            scheduleEmail.ProjectModuleId = 0;
            ScheduleEmailUow.RegisterNew<ScheduleEmail>(scheduleEmail);
            ScheduleEmailUow.Commit();
        }


        public void RecentActivityPost(RecentActivityAndNotification recentActivityAndNotification)
        {
            RecentActivityAndNotificationUow.RegisterNew<RecentActivityAndNotification>(recentActivityAndNotification);
            RecentActivityAndNotificationUow.Commit();
        }

        public string GetUrl(int projectModuleId)
        {
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = projectModuleId };
            spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
            var storeProcSearchResultURL =  DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spGetUrl @ProjectModuleId, @UserId", spParameters).Result;
            return storeProcSearchResultURL.SingleOrDefault()?.Result;
        }
    }

    public interface IApplicationUtility
    {
        string GetTableName<T>();
        bool CandDelete<DbEntity>(int recordId, bool isMainDb);

        string GetValidationMessage(ValidationFailedCode validationFailed, bool isMainDb, params string[] replaceTexts);

        void scheduleEmailPost(int userId, Project project, int noOfDays, string EmailTemplateName);

        void RecentActivityPost(RecentActivityAndNotification recentActivityAndNotification);

        string GetUrl(int projectModuleId);
    }
}
