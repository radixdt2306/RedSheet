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
	[Route("api/projecteventtimelines/{projectEventTimelineId}/[controller]")]
    public class ArrivalAndOpeningTacticsController : BaseController
    {
        public ArrivalAndOpeningTacticsController(IProjectEventTimelineUow projectEventTimelineUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectEventTimeline = projectEventTimelineUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectEventTimelineId) => Ok(Uow.ProjectEventTimeline.Repository<vArrivalAndOpeningTactic>().FindBy(t=> t.ProjectEventTimelineId == projectEventTimelineId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectEventTimelineId, int id)  => Ok(Uow.ProjectEventTimeline.Repository<ArrivalAndOpeningTactic>().SingleOrDefault(t => t.ArrivalAndOpeningTacticId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ArrivalAndOpeningTactic arrivalAndOpeningTactic)
        {
            Uow.ProjectEventTimeline.RegisterNew<ArrivalAndOpeningTactic>(arrivalAndOpeningTactic);
            Uow.ProjectEventTimeline.Commit();
            return Ok(arrivalAndOpeningTactic);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ArrivalAndOpeningTactic arrivalAndOpeningTactic)
        {
            Uow.ProjectEventTimeline.RegisterDirty<ArrivalAndOpeningTactic>(arrivalAndOpeningTactic);
            Uow.ProjectEventTimeline.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var arrivalAndOpeningTactic = Uow.ProjectEventTimeline.Repository<ArrivalAndOpeningTactic>().FindByKey(id);
            Uow.ProjectEventTimeline.RegisterDeleted<ArrivalAndOpeningTactic>(arrivalAndOpeningTactic);
            Uow.ProjectEventTimeline.Commit();
            return NoContent();
        }
    }
}