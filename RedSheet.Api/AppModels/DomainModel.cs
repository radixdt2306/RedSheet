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
namespace RedSheet.Api.AppModels
{
    public class DomainModel
    {
		public IExportReportPDFDomain  ExportReportPDF { get; set; }
		public ILiteMeetingManagementTimingDomain  LiteMeetingManagementTiming { get; set; }
		public ILiteProjectBackgroundDomain  LiteProjectBackground { get; set; }
		public ILiteTheirTeamMemberDomain  LiteTheirTeamMember { get; set; }
		public ILiteOurTeamMemberDomain  LiteOurTeamMember { get; set; }
		public INanoScopeToNegotiateObjectiveDomain  NanoScopeToNegotiateObjective { get; set; }
		public IProjectDomain  Project { get; set; }
		public IBackgroundEventDomain  BackgroundEvent { get; set; }
		public IProjectCultureDomain  ProjectCulture { get; set; }
		public IProjectCulturePlanDomain  ProjectCulturePlan { get; set; }
		public IEventAgendaTimingDomain  EventAgendaTiming { get; set; }
		public IProjectGameDetailDomain  ProjectGameDetail { get; set; }
		public IProjectModuleDomain  ProjectModule { get; set; }
		public IProjectImplementationPlanDomain  ProjectImplementationPlan { get; set; }
		public IProjectModuleReviewDomain  ProjectModuleReview { get; set; }
		public INanoDiscussionSequenceDomain  NanoDiscussionSequence { get; set; }
		public IProjectNegotiationDomain  ProjectNegotiation { get; set; }
		public ITheirTeamMemberDomain  TheirTeamMember { get; set; }
		public IProjectNegotionalityDomain  ProjectNegotionality { get; set; }
		public IOurTeamMemberDomain  OurTeamMember { get; set; }
		public IProjectPowerDomain  ProjectPower { get; set; }
		public IProjectRequirementDomain  ProjectRequirement { get; set; }
		public IOurRequirementDetailDomain  OurRequirementDetail { get; set; }
		public ITheirRequirementDetailDomain  TheirRequirementDetail { get; set; }
		public IProjectStakeholderDomain  ProjectStakeholder { get; set; }
		public IScheduleEmailDomain  ScheduleEmail { get; set; }
    }
}