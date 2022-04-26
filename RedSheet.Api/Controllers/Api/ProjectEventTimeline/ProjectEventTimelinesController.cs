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
	[Route("api/[controller]")]
    public class ProjectEventTimelinesController : BaseController
    {
        public ProjectEventTimelinesController(IProjectEventTimelineUow projectEventTimelineUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectEventTimeline = projectEventTimelineUow;
            ApplicationUtility = applicationUtility;
        }

        [HttpGet]
        public IActionResult Get() => Ok(Uow.ProjectEventTimeline.Repository<ProjectEventTimeline>().All());


        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Uow.ProjectEventTimeline.Repository<vProjectEventTimelineRecord>().SingleOrDefault(t => t.ProjectEventTimelineId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectEventTimeline projectEventTimeline)
        {
            Uow.ProjectEventTimeline.RegisterNew<ProjectEventTimeline>(projectEventTimeline);
            Uow.ProjectEventTimeline.Commit();
            return Ok(projectEventTimeline);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectEventTimeline projectEventTimeline)
        {
            Uow.ProjectEventTimeline.RegisterDirty<ProjectEventTimeline>(projectEventTimeline);
            Uow.ProjectEventTimeline.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //var eventagendaTimings = Uow.ProjectEventTimeline.Repository<EventAgendaTiming>().FindBy(t => t.ProjectEventTimelineId == id);
            //eventagendaTimings.ToList().ForEach(t =>
            //{
            //    Uow.ProjectEventTimeline.RegisterDeleted<EventAgendaTiming>(t);
            //});
            //var arrivalAndOpeningTactics = Uow.ProjectEventTimeline.Repository<ArrivalAndOpeningTactic>().FindBy(t => t.ProjectEventTimelineId == id);
            //arrivalAndOpeningTactics.ToList().ForEach(t =>
            //{
            //    Uow.ProjectEventTimeline.RegisterDeleted<ArrivalAndOpeningTactic>(t);
            //});
            Uow.ProjectEventTimeline.Commit();
            var projectEventTimeline = Uow.ProjectEventTimeline.Repository<ProjectEventTimeline>().FindByKey(id);
            Uow.ProjectEventTimeline.RegisterDeleted<ProjectEventTimeline>(projectEventTimeline);
            Uow.ProjectEventTimeline.Commit();
            return NoContent();
        }
    }
}