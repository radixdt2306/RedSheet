using System.Collections.Generic;
using RedSheet.Api.Controllers;

namespace RedSheet.Api
{
    public static class AuthorizationLookupByPassApis
    {
        public static List<string> LookupByPass()
        {
            return new List<string> {
                    typeof(LiteMeetingManagementLookupsController).Name,
                    typeof(LiteProjectBackgroundLookupsController).Name,
                    typeof(NanoScopeToNegotiateObjectiveLookupsController).Name,
                    typeof(ProjectLookupsController).Name,
                    typeof(ProjectBackgroundLookupsController).Name,
                    typeof(ProjectCultureLookupsController).Name,
                    typeof(ProjectCulturePlanLookupsController).Name,
                    typeof(ProjectEventTimelineLookupsController).Name,
                    typeof(ProjectModuleLookupsController).Name,
                    typeof(ProjectNegotiationLookupsController).Name,
                    typeof(ProjectNegotionalityLookupsController).Name,
                    typeof(ProjectPowerLookupsController).Name,
                    typeof(ProjectStakeholderLookupsController).Name,
                };
        }
    }
}