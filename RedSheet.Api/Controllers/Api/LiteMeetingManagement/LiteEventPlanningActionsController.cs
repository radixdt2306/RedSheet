using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
    [TypeFilter(typeof(ProjectUpdate))]
    [Route("api/litemeetingmanagements/{liteMeetingManagementId}/[controller]")]
    public class LiteEventPlanningActionsController : BaseController
    {
        public LiteEventPlanningActionsController(ILiteMeetingManagementUow liteMeetingManagementUow, IApplicationUtility applicationUtility)
        {
            Uow.LiteMeetingManagement = liteMeetingManagementUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int liteMeetingManagementId) => Ok(Uow.LiteMeetingManagement.Repository<vLiteEventPlanningAction>().FindBy(t=> t.LiteMeetingManagementId == liteMeetingManagementId));


        [HttpGet("{id}")]
        public IActionResult   Get(int liteMeetingManagementId, int id)  => Ok(Uow.LiteMeetingManagement.Repository<vLiteEventPlanningActionRecord>().SingleOrDefault(t => t.LiteEventPlanningActionId == id));

        [HttpPost]
        public IActionResult Post([FromBody]LiteEventPlanningAction liteEventPlanningAction)
        {
            Uow.LiteMeetingManagement.RegisterNew<LiteEventPlanningAction>(liteEventPlanningAction);
            Uow.LiteMeetingManagement.Commit();
            return Ok(liteEventPlanningAction);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteEventPlanningAction liteEventPlanningAction)
        {
            Uow.LiteMeetingManagement.RegisterDirty<LiteEventPlanningAction>(liteEventPlanningAction);
            Uow.LiteMeetingManagement.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var liteEventPlanningAction = Uow.LiteMeetingManagement.Repository<LiteEventPlanningAction>().FindByKey(id);
            Uow.LiteMeetingManagement.RegisterDeleted<LiteEventPlanningAction>(liteEventPlanningAction);
            Uow.LiteMeetingManagement.Commit();
            return NoContent();
        }
    }
}