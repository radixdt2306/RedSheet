
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectStakeholderModule;
using RedSheet.BoundedContext;
using RedSheet.Domain.ClientServiceModule;
using RedSheet.Api.Constants;
using Rx.Core.Security;
using System.Security.Claims;
using Rx.Core.Settings;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationServicesController : BaseController
    {

        public ApplicationServicesController(ClientServiceContext clientServiceContext, ServerSetting serverSetting)
        {
            this.ClientServiceContext = clientServiceContext;
            this.ServerSetting = serverSetting;
        }
        private ServerSetting ServerSetting { get; set; }



        [HttpGet(ActionNames.ProjectTemplates)]
        //[HttpGet("{id}")]
        public IActionResult Get(string id) => Ok(this.ClientServiceContext.GetProjectTemplates(new Guid(ServerSetting.Get<string>("appSettings.applicationId")), new Guid(id)));



        [HttpGet(ActionNames.ApplicationUsers)]
        public async Task<Domain.MemberShipService.Workflow_User[]> GetApplicationUsers() => this.ClientServiceContext.Workflow_GetApplicationUsers(new Guid(ServerSetting.Get<string>("appSettings.applicationId")).ToString(), UserClaim.Get(ClaimTypes.PrimarySid));

    }
}