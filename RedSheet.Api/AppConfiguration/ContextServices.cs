using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RedSheet.BoundedContext;

namespace RedSheet.Api
{
    public class ContextServices
    {
        public static void Register(IServiceCollection services,IConfigurationRoot configuration)
        {
            services.AddScoped<IExportReportContext, ExportReportContext>();
            services.AddScoped<ILiteMeetingManagementContext, LiteMeetingManagementContext>();
            services.AddScoped<ILiteMeetingManagementLookupContext, LiteMeetingManagementLookupContext>();
            services.AddScoped<ILiteProjectBackgroundContext, LiteProjectBackgroundContext>();
            services.AddScoped<ILiteProjectBackgroundLookupContext, LiteProjectBackgroundLookupContext>();
            services.AddScoped<INanoScopeToNegotiateObjectiveContext, NanoScopeToNegotiateObjectiveContext>();
            services.AddScoped<INanoScopeToNegotiateObjectiveLookupContext, NanoScopeToNegotiateObjectiveLookupContext>();
            services.AddScoped<IProjectContext, ProjectContext>();
            services.AddScoped<IProjectLookupContext, ProjectLookupContext>();
            services.AddScoped<IProjectBackgroundContext, ProjectBackgroundContext>();
            services.AddScoped<IProjectBackgroundLookupContext, ProjectBackgroundLookupContext>();
            services.AddScoped<IProjectCultureContext, ProjectCultureContext>();
            services.AddScoped<IProjectCultureLookupContext, ProjectCultureLookupContext>();
            services.AddScoped<IProjectCulturePlanContext, ProjectCulturePlanContext>();
            services.AddScoped<IProjectCulturePlanLookupContext, ProjectCulturePlanLookupContext>();
            services.AddScoped<IProjectEventTimelineContext, ProjectEventTimelineContext>();
            services.AddScoped<IProjectEventTimelineLookupContext, ProjectEventTimelineLookupContext>();
            services.AddScoped<IProjectGameContext, ProjectGameContext>();
            services.AddScoped<IProjectLearningContext, ProjectLearningContext>();
            services.AddScoped<IProjectModuleContext, ProjectModuleContext>();
            services.AddScoped<IProjectModuleLookupContext, ProjectModuleLookupContext>();
            services.AddScoped<IProjectNegotiationContext, ProjectNegotiationContext>();
            services.AddScoped<IProjectNegotiationLookupContext, ProjectNegotiationLookupContext>();
            services.AddScoped<IProjectNegotionalityContext, ProjectNegotionalityContext>();
            services.AddScoped<IProjectNegotionalityLookupContext, ProjectNegotionalityLookupContext>();
            services.AddScoped<IProjectPowerContext, ProjectPowerContext>();
            services.AddScoped<IProjectPowerLookupContext, ProjectPowerLookupContext>();
            services.AddScoped<IProjectPreparationContext, ProjectPreparationContext>();
            services.AddScoped<IProjectRequirementContext, ProjectRequirementContext>();
            services.AddScoped<IProjectStakeholderContext, ProjectStakeholderContext>();
            services.AddScoped<IProjectStakeholderLookupContext, ProjectStakeholderLookupContext>();
            services.AddScoped<IRecentActivityAndNotificationContext, RecentActivityAndNotificationContext>();
            services.AddScoped<IScheduleEmailContext, ScheduleEmailContext>();
        }
    }
}