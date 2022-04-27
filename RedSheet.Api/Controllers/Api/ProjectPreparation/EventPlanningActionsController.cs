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
	[Route("api/projectpreparations/{projectPreparationId}/[controller]")]
    public class EventPlanningActionsController : BaseController
    {
        public EventPlanningActionsController(IProjectPreparationUow projectPreparationUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectPreparation = projectPreparationUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectPreparationId) => Ok(Uow.ProjectPreparation.Repository<vEventPlanningAction>().FindBy(t=> t.ProjectPreparationId == projectPreparationId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectPreparationId, int id)  => Ok(Uow.ProjectPreparation.Repository<vEventPlanningActionRecord>().SingleOrDefault(t => t.EventPlanningActionId == id));

        [HttpPost]
        public IActionResult Post([FromBody]EventPlanningAction eventPlanningAction)
        {
            Uow.ProjectPreparation.RegisterNew<EventPlanningAction>(eventPlanningAction);
            Uow.ProjectPreparation.Commit();
            return Ok(eventPlanningAction);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]EventPlanningAction eventPlanningAction)
        {
            Uow.ProjectPreparation.RegisterDirty<EventPlanningAction>(eventPlanningAction);
            Uow.ProjectPreparation.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var eventPlanningAction = Uow.ProjectPreparation.Repository<EventPlanningAction>().FindByKey(id);
            Uow.ProjectPreparation.RegisterDeleted<EventPlanningAction>(eventPlanningAction);
            Uow.ProjectPreparation.Commit();
            return NoContent();
        }
    }
}