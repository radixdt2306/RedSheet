
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectEventTimelineModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.ProjectEventTimelineControllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projecteventtimelines/{projectEventTimelineId}/[controller]")]
	public class EventAgendaTimingsController : BaseController
	{

		public EventAgendaTimingsController(IProjectEventTimelineUow projectEventTimelineUow, IEventAgendaTimingDomain eventAgendaTimingDomain)
		{
			Uow.ProjectEventTimeline = projectEventTimelineUow;
			Domain.EventAgendaTiming = eventAgendaTimingDomain;
		}


		public IActionResult Get(int projectEventTimelineId) => Ok(Domain.EventAgendaTiming.Get(projectEventTimelineId));

		[HttpGet("{id}")]
		public IActionResult Get(int projectEventTimelineId, int id) => Ok(Domain.EventAgendaTiming.Get(projectEventTimelineId, id));

		[HttpPost]
		public IActionResult Post([FromBody]EventAgendaTiming eventAgendaTiming)
		{
            eventAgendaTiming.SortOrder = Domain.EventAgendaTiming.GetMaxSortOrder(eventAgendaTiming) + 1;            
            var validations = Domain.EventAgendaTiming.AddValidation(eventAgendaTiming);
			if (validations.Count() == 0)
			{
				var result = Domain.EventAgendaTiming.Add(eventAgendaTiming);
				return Ok(result);
			}
			return BadRequest(validations);
		}

		//[HttpPut("{id}")]
		//public IActionResult Put(int id, [FromBody]EventAgendaTiming eventAgendaTiming)
		//{

		//    if (eventAgendaTiming.previousEventAgendaTimingId != 0)
		//    {
		//        var previousEventAgendaTiming = Uow.ProjectEventTimeline.Repository<EventAgendaTiming>().FindByKey(eventAgendaTiming.previousEventAgendaTimingId);
		//        //previousEventAgendaTiming.RowIndex = eventAgendaTiming.previousEventAgendaTimingRowIndex;                
		//        previousEventAgendaTiming.SortOrder = eventAgendaTiming.previousEventAgendaTimingSortOrder;
		//        //var validations_Previous = Domain.EventAgendaTiming.UpdateValidation(previousEventAgendaTiming);
		//        //if (validations_Previous.Count() == 0)
		//        {
		//            var result = Domain.EventAgendaTiming.Update(previousEventAgendaTiming);
		//            //return Ok(result);
		//        }           
		//    }

		//    var validations = Domain.EventAgendaTiming.UpdateValidation(eventAgendaTiming);
		//    if (validations.Count() == 0) {
		//        var result = Domain.EventAgendaTiming.Update(eventAgendaTiming);
		//        return Ok(result);
		//    }
		//    return BadRequest(validations);
		//}
		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]EventAgendaTiming eventAgendaTiming)
		{

            if (eventAgendaTiming.previousEventAgendaTimingId != 0)
            {
                var previousEventAgendaTiming = Uow.ProjectEventTimeline.Repository<EventAgendaTiming>().FindByKey(eventAgendaTiming.previousEventAgendaTimingId);
                previousEventAgendaTiming.EventAgendaTimingId = eventAgendaTiming.previousEventAgendaTimingId;
                previousEventAgendaTiming.SortOrder = eventAgendaTiming.previousEventAgendaTimingSortOrder;
                previousEventAgendaTiming.Time = TimeSpan.Parse(eventAgendaTiming.previousEventAgendaTimingTime);
                var result = Domain.EventAgendaTiming.Update(previousEventAgendaTiming);
            }
            else
            {
                //eventAgendaTiming.SortOrder = Domain.EventAgendaTiming.GetMaxSortOrder(eventAgendaTiming) + 1;
            }                                                                                                 
            
            var validations = Domain.EventAgendaTiming.UpdateValidation(eventAgendaTiming);
			if (validations.Count() == 0)
			{
                var checkSortOrder = Uow.ProjectEventTimeline.Repository<EventAgendaTiming>().FindBy(a => a.NegotiationPhaseId == eventAgendaTiming.NegotiationPhaseId && a.EventAgendaTimingId == eventAgendaTiming.EventAgendaTimingId);
                if (checkSortOrder.Count() == 0)
                {
                    eventAgendaTiming.SortOrder = Domain.EventAgendaTiming.GetMaxSortOrder(eventAgendaTiming) + 1;
                }

                var result = Domain.EventAgendaTiming.Update(eventAgendaTiming);
				return Ok(result);
			}
			return BadRequest(validations);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var validations = Domain.EventAgendaTiming.DeleteValidation(id);
			if (validations.Count() == 0)
			{
				Domain.EventAgendaTiming.Delete(id);
				return Ok(id);
			}
			return BadRequest(validations);
		}
	}
}
