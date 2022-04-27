using RedSheet.UnitOfWork;

namespace RedSheet.Api.AppModels
{
    public class UnitOfWorkModel
    {
		public IExportReportUow ExportReport { get; set; }
		public ILiteMeetingManagementUow LiteMeetingManagement { get; set; }
		public ILiteMeetingManagementLookupUow LiteMeetingManagementLookup { get; set; }
		public ILiteProjectBackgroundUow LiteProjectBackground { get; set; }
		public ILiteProjectBackgroundLookupUow LiteProjectBackgroundLookup { get; set; }
		public INanoScopeToNegotiateObjectiveUow NanoScopeToNegotiateObjective { get; set; }
		public INanoScopeToNegotiateObjectiveLookupUow NanoScopeToNegotiateObjectiveLookup { get; set; }
		public IProjectUow Project { get; set; }
		public IProjectLookupUow ProjectLookup { get; set; }
		public IProjectBackgroundUow ProjectBackground { get; set; }
		public IProjectBackgroundLookupUow ProjectBackgroundLookup { get; set; }
		public IProjectCultureUow ProjectCulture { get; set; }
		public IProjectCultureLookupUow ProjectCultureLookup { get; set; }
		public IProjectCulturePlanUow ProjectCulturePlan { get; set; }
		public IProjectCulturePlanLookupUow ProjectCulturePlanLookup { get; set; }
		public IProjectEventTimelineUow ProjectEventTimeline { get; set; }
		public IProjectEventTimelineLookupUow ProjectEventTimelineLookup { get; set; }
		public IProjectGameUow ProjectGame { get; set; }
		public IProjectLearningUow ProjectLearning { get; set; }
		public IProjectModuleUow ProjectModule { get; set; }
		public IProjectModuleLookupUow ProjectModuleLookup { get; set; }
		public IProjectNegotiationUow ProjectNegotiation { get; set; }
		public IProjectNegotiationLookupUow ProjectNegotiationLookup { get; set; }
		public IProjectNegotionalityUow ProjectNegotionality { get; set; }
		public IProjectNegotionalityLookupUow ProjectNegotionalityLookup { get; set; }
		public IProjectPowerUow ProjectPower { get; set; }
		public IProjectPowerLookupUow ProjectPowerLookup { get; set; }
		public IProjectPreparationUow ProjectPreparation { get; set; }
		public IProjectRequirementUow ProjectRequirement { get; set; }
		public IProjectStakeholderUow ProjectStakeholder { get; set; }
		public IProjectStakeholderLookupUow ProjectStakeholderLookup { get; set; }
		public IRecentActivityAndNotificationUow RecentActivityAndNotification { get; set; }
		public IScheduleEmailUow ScheduleEmail { get; set; }
    }
}