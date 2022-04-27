using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RedSheet.UnitOfWork;

namespace RedSheet.Api
{
    public class UnitOfWorkServices
    {
        public static void Register(IServiceCollection services,IConfigurationRoot configuration)
        {
            services.AddScoped<IExportReportUow, ExportReportUow>();
            services.AddScoped<ILiteMeetingManagementUow, LiteMeetingManagementUow>();
            services.AddScoped<ILiteMeetingManagementLookupUow, LiteMeetingManagementLookupUow>();
            services.AddScoped<ILiteProjectBackgroundUow, LiteProjectBackgroundUow>();
            services.AddScoped<ILiteProjectBackgroundLookupUow, LiteProjectBackgroundLookupUow>();
            services.AddScoped<INanoScopeToNegotiateObjectiveUow, NanoScopeToNegotiateObjectiveUow>();
            services.AddScoped<INanoScopeToNegotiateObjectiveLookupUow, NanoScopeToNegotiateObjectiveLookupUow>();
            services.AddScoped<IProjectUow, ProjectUow>();
            services.AddScoped<IProjectLookupUow, ProjectLookupUow>();
            services.AddScoped<IProjectBackgroundUow, ProjectBackgroundUow>();
            services.AddScoped<IProjectBackgroundLookupUow, ProjectBackgroundLookupUow>();
            services.AddScoped<IProjectCultureUow, ProjectCultureUow>();
            services.AddScoped<IProjectCultureLookupUow, ProjectCultureLookupUow>();
            services.AddScoped<IProjectCulturePlanUow, ProjectCulturePlanUow>();
            services.AddScoped<IProjectCulturePlanLookupUow, ProjectCulturePlanLookupUow>();
            services.AddScoped<IProjectEventTimelineUow, ProjectEventTimelineUow>();
            services.AddScoped<IProjectEventTimelineLookupUow, ProjectEventTimelineLookupUow>();
            services.AddScoped<IProjectGameUow, ProjectGameUow>();
            services.AddScoped<IProjectLearningUow, ProjectLearningUow>();
            services.AddScoped<IProjectModuleUow, ProjectModuleUow>();
            services.AddScoped<IProjectModuleLookupUow, ProjectModuleLookupUow>();
            services.AddScoped<IProjectNegotiationUow, ProjectNegotiationUow>();
            services.AddScoped<IProjectNegotiationLookupUow, ProjectNegotiationLookupUow>();
            services.AddScoped<IProjectNegotionalityUow, ProjectNegotionalityUow>();
            services.AddScoped<IProjectNegotionalityLookupUow, ProjectNegotionalityLookupUow>();
            services.AddScoped<IProjectPowerUow, ProjectPowerUow>();
            services.AddScoped<IProjectPowerLookupUow, ProjectPowerLookupUow>();
            services.AddScoped<IProjectPreparationUow, ProjectPreparationUow>();
            services.AddScoped<IProjectRequirementUow, ProjectRequirementUow>();
            services.AddScoped<IProjectStakeholderUow, ProjectStakeholderUow>();
            services.AddScoped<IProjectStakeholderLookupUow, ProjectStakeholderLookupUow>();
            services.AddScoped<IRecentActivityAndNotificationUow, RecentActivityAndNotificationUow>();
            services.AddScoped<IScheduleEmailUow, ScheduleEmailUow>();
        }
    }
}