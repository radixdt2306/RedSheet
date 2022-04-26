using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.ViewModels.Models
{
    public class NegotationPlanReport
    {
        public int ProjectId { get; set; }
        public int ProjectModuleId { get; set; }
        public int? ProjectBackgroundId { get; set; }
        public string OpponentName { get; set; }
        public string Focus { get; set; }
        public string Reason { get; set; }
        public int? ProjectNegotiationId { get; set; }
        public DateTime? EventDate { get; set; }
    }

    public class AboutThisNegotiationEventReport
    {
        public int? ProjectNegotiationId { get; set; }
        public int ProjectId { get; set; }
        public int ProjectModuleId { get; set; }
        public int? ProjectBackgroundId { get; set; }
        public string OpponentName { get; set; }
        public string Focus { get; set; }
        public string Reason { get; set; }
        public int? NegotiationTypeId { get; set; }
        public DateTime? EventDate { get; set; }
        public string Location { get; set; }
        public string KnownIssues { get; set; }
        public int? ProjectEventTimelineId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string EventDuration { get; set; }
        public bool? IsEndTimeFixed { get; set; }
        public string CommunicationModeId { get; set; }
        public string CommunicationModeName { get; set; }
        public string ClassName { get; set; }
        public string TheirTeamCommunicationModeId { get; set; }
    }

    public class StakeholderEngagementReport
    {
        public int ProjectId { get; set; }
        public int ProjectModuleId { get; set; }
        public int? ProjectStakeholderId { get; set; }
        public string StakeholderName { get; set; }
        public int? StakeholderTypeId { get; set; }
        public string Frequancy { get; set; }
        public string ActionRequried { get; set; }
        public string StakeholderTypeName { get; set; }
        public string StakeholderTypeClassName { get; set; }
        public string CommunicationModeId { get; set; }
        public string CommunicationModeName { get; set; }
        public string CommunicationModeClassName { get; set; }
        public string StakeholderCommunicationModeId { get; set; }
        public int? ProjectPreparationId { get; set; }
        public string ElevatorSpeech { get; set; }
        public string PreConditioningMessage { get; set; }
        public int? CommunicationPlanId { get; set; }
        public string Message { get; set; }
        public string To { get; set; }
        public string MediaMeans { get; set; }
    }

    public class OurRelativePowerPositionReport
    {
        public int ProjectId { get; set; }
        public int ProjectModuleId { get; set; }
        public int? ProjectPowerId { get; set; }
        public string PowerDetail { get; set; }
        public int? ActualId { get; set; }
        public int? ProjectedId { get; set; }
        public bool? IsOurKnowledge { get; set; }
        public bool? IsTheirKnowledge { get; set; }
        public string Rationale { get; set; }
        public string PowerTypeName { get; set; }
        public string ActualValue { get; set; }
        public string ProjectedValue { get; set; }
    }

    public class OurTeamReport
    {
        public int ProjectId { get; set; }
        public int ProjectModuleId { get; set; }
        public int? ProjectNegotionalityId { get; set; }
        public int? NegotionalityCategoryId { get; set; }
        public int? OurTeamMemberId { get; set; }
        public int? UserId { get; set; }
        public int? TeamRoleId { get; set; }
        public int? OurTeamMemberBehaviourId { get; set; }
        public string OutingName { get; set; }
        public string ConsciousnessName { get; set; }
        public string WIllToWinName { get; set; }
        public string SolutionFocusedName { get; set; }
        public string OpenMindedName { get; set; }
        public string AgreeableName { get; set; }
        public string PersonalCalmName { get; set; }
        public string AssertivenessName { get; set; }
        public string ConflictStyleName { get; set; }
        public string EmotionalCompetenceName { get; set; }
        public string UserName { get; set; }
        public string TeamRoleName { get; set; }
    }

    public class RedSheetReport
    {
        public List<NegotationPlanReport> NegotationPlanReport { get; set; }
        public List<AboutThisNegotiationEventReport> AboutThisNegotiationEventReport { get; set; }
        public List<StakeholderEngagementReport> StakeholderEngagementReport { get; set; }
        public List<OurRelativePowerPositionReport> OurRelativePowerPositionReport { get; set; }
        public List<OurTeamReport> OurTeamReport { get; set; }
    }
}

