using Microsoft.Extensions.DependencyInjection;
using RedSheet.Domain.ExportReportModule;
using RedSheet.Domain.LiteMeetingManagementModule;
using RedSheet.Domain.LiteProjectBackgroundModule;
using RedSheet.Domain.NanoScopeToNegotiateObjectiveModule;
using RedSheet.Domain.ProjectModule;
using RedSheet.Domain.ProjectBackgroundModule;
using RedSheet.Domain.ProjectCultureModule;
using RedSheet.Domain.ProjectCulturePlanModule;
using RedSheet.Domain.ProjectEventTimelineModule;
using RedSheet.Domain.ProjectGameModule;
using RedSheet.Domain.ProjectModuleModule;
using RedSheet.Domain.ProjectNegotiationModule;
using RedSheet.Domain.ProjectNegotionalityModule;
using RedSheet.Domain.ProjectPowerModule;
using RedSheet.Domain.ProjectRequirementModule;
using RedSheet.Domain.ProjectStakeholderModule;
using RedSheet.Domain.ScheduleEmailsModule;
namespace RedSheet.Api
{
    public class DomainServices
    {
        public static void Register(IServiceCollection services)
        {
            services.AddScoped<IExportReportPDFDomain, ExportReportPDFDomain>();
            services.AddScoped<ILiteMeetingManagementTimingDomain, LiteMeetingManagementTimingDomain>();
            services.AddScoped<ILiteProjectBackgroundDomain, LiteProjectBackgroundDomain>();
            services.AddScoped<ILiteTheirTeamMemberDomain, LiteTheirTeamMemberDomain>();
            services.AddScoped<ILiteOurTeamMemberDomain, LiteOurTeamMemberDomain>();
            services.AddScoped<INanoScopeToNegotiateObjectiveDomain, NanoScopeToNegotiateObjectiveDomain>();
            services.AddScoped<IProjectDomain, ProjectDomain>();
            services.AddScoped<IBackgroundEventDomain, BackgroundEventDomain>();
            services.AddScoped<IProjectCultureDomain, ProjectCultureDomain>();
            services.AddScoped<IProjectCulturePlanDomain, ProjectCulturePlanDomain>();
            services.AddScoped<IEventAgendaTimingDomain, EventAgendaTimingDomain>();
            services.AddScoped<IProjectGameDetailDomain, ProjectGameDetailDomain>();
            services.AddScoped<IProjectModuleDomain, ProjectModuleDomain>();
            services.AddScoped<IProjectImplementationPlanDomain, ProjectImplementationPlanDomain>();
            services.AddScoped<IProjectModuleReviewDomain, ProjectModuleReviewDomain>();
            services.AddScoped<INanoDiscussionSequenceDomain, NanoDiscussionSequenceDomain>();
            services.AddScoped<IProjectNegotiationDomain, ProjectNegotiationDomain>();
            services.AddScoped<ITheirTeamMemberDomain, TheirTeamMemberDomain>();
            services.AddScoped<IProjectNegotionalityDomain, ProjectNegotionalityDomain>();
            services.AddScoped<IOurTeamMemberDomain, OurTeamMemberDomain>();
            services.AddScoped<IProjectPowerDomain, ProjectPowerDomain>();
            services.AddScoped<IProjectRequirementDomain, ProjectRequirementDomain>();
            services.AddScoped<IOurRequirementDetailDomain, OurRequirementDetailDomain>();
            services.AddScoped<ITheirRequirementDetailDomain, TheirRequirementDetailDomain>();
            services.AddScoped<IProjectStakeholderDomain, ProjectStakeholderDomain>();
            services.AddScoped<IScheduleEmailDomain, ScheduleEmailDomain>();
        }
    }
}