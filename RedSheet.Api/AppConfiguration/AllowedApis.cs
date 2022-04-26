using RedSheet.Api.Controllers;
using RedSheet.Api.Controllers.Api;
using RedSheet.Api.Controllers.ExportReportControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedSheet.Api
{
    public static class ApplicationApi
    {
        public static List<string> AuthenitcationByPass() {
           return new List<string> {
                    typeof(UserAuthenticationController).Name,
                    typeof(KeysController).Name,
                    typeof(ContextsController).Name,
                    typeof(ApplicationConfigurationsController).Name,
                    typeof(MasterLookupsController).Name,
                    typeof(ModuleContentsController).Name,
                    typeof(ExportReportPDFsController).Name
                };
        }

        public static List<string> AuthorizationByPass() {
            var byPassApis=  new List<string> {
                    typeof(UserAuthorizationController).Name,
                    typeof(ApplicationConfigurationsController).Name,
                    typeof(EntityLogsController).Name,
                    typeof(ModuleContentsController).Name,
                    typeof(KeysController).Name,
                    typeof(ContextsController).Name,
                    typeof(MasterLookupsController).Name,
                    typeof(RecordLocksController).Name,
                    typeof(ExportReportPDFsController).Name
                };
            byPassApis.AddRange(AuthorizationLookupByPassApis.LookupByPass());
            return byPassApis;
        }


    }
}
