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
    public class LiteMeetingPlanningsController : BaseController
    {
        public LiteMeetingPlanningsController(ILiteMeetingManagementUow liteMeetingManagementUow, IApplicationUtility applicationUtility)
        {
            Uow.LiteMeetingManagement = liteMeetingManagementUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int liteMeetingManagementId) => Ok(Uow.LiteMeetingManagement.Repository<vLiteMeetingPlanning>().FindBy(t=> t.LiteMeetingManagementId == liteMeetingManagementId));


        [HttpGet("{id}")]
        public IActionResult   Get(int liteMeetingManagementId, int id)  => Ok(Uow.LiteMeetingManagement.Repository<vLiteMeetingPlanningRecord>().SingleOrDefault(t => t.LiteMeetingPlanningId == id));

        [HttpPost]
        public IActionResult Post([FromBody]LiteMeetingPlanning liteMeetingPlanning)
        {
            Uow.LiteMeetingManagement.RegisterNew<LiteMeetingPlanning>(liteMeetingPlanning);
            Uow.LiteMeetingManagement.Commit();
            return Ok(liteMeetingPlanning);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteMeetingPlanning liteMeetingPlanning)
        {
            Uow.LiteMeetingManagement.RegisterDirty<LiteMeetingPlanning>(liteMeetingPlanning);
            Uow.LiteMeetingManagement.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var liteMeetingPlanning = Uow.LiteMeetingManagement.Repository<LiteMeetingPlanning>().FindByKey(id);
            Uow.LiteMeetingManagement.RegisterDeleted<LiteMeetingPlanning>(liteMeetingPlanning);
            Uow.LiteMeetingManagement.Commit();
            return NoContent();
        }
    }
}