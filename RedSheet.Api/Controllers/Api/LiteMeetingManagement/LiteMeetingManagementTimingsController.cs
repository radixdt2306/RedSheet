
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.LiteMeetingManagementModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.LiteMeetingManagementControllers
{
    [TypeFilter(typeof(ProjectUpdate))]
    [Route("api/litemeetingmanagements/{liteMeetingManagementId}/[controller]")]
    public class LiteMeetingManagementTimingsController : BaseController
    {
        
        public LiteMeetingManagementTimingsController(ILiteMeetingManagementUow liteMeetingManagementUow, ILiteMeetingManagementTimingDomain liteMeetingManagementTimingDomain)
        {
            Uow.LiteMeetingManagement = liteMeetingManagementUow;
            Domain.LiteMeetingManagementTiming = liteMeetingManagementTimingDomain;
        }

        
		public IActionResult Get(int liteMeetingManagementId) => Ok(Domain.LiteMeetingManagementTiming.Get(liteMeetingManagementId));

        [HttpGet("{id}")]
        public IActionResult   Get(int liteMeetingManagementId, int id)  => Ok(Domain.LiteMeetingManagementTiming.  Get(liteMeetingManagementId,id) );

        [HttpPost]
        public IActionResult Post([FromBody]LiteMeetingManagementTiming liteMeetingManagementTiming)
        {
            liteMeetingManagementTiming.SortOrder = Domain.LiteMeetingManagementTiming.GetMaxSortOrder(liteMeetingManagementTiming) + 1;
            var validations = Domain.LiteMeetingManagementTiming.AddValidation(liteMeetingManagementTiming);
            if (validations.Count() == 0) {
                var result = Domain.LiteMeetingManagementTiming.Add(liteMeetingManagementTiming);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody]LiteMeetingManagementTiming liteMeetingManagementTiming)
        //{
        //    var validations = Domain.LiteMeetingManagementTiming.UpdateValidation(liteMeetingManagementTiming);
        //    if (validations.Count() == 0) {
        //        var result = Domain.LiteMeetingManagementTiming.Update(liteMeetingManagementTiming);
        //        return Ok(result);
        //    }
        //    return BadRequest(validations);
        //}

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteMeetingManagementTiming liteMeetingManagementTiming)
        {

            if (liteMeetingManagementTiming.previousLiteMeetingManagementTimingId != 0)
            {
                var previousMeetingManagementTiming = Uow.LiteMeetingManagement.Repository<LiteMeetingManagementTiming>().FindByKey(liteMeetingManagementTiming.previousLiteMeetingManagementTimingId);
                previousMeetingManagementTiming.LiteMeetingManagementTimingId = liteMeetingManagementTiming.previousLiteMeetingManagementTimingId;
                previousMeetingManagementTiming.SortOrder = liteMeetingManagementTiming.previousLiteMeetingManagementTimingSortOrder;
                previousMeetingManagementTiming.Time = TimeSpan.Parse(liteMeetingManagementTiming.previousLiteMeetingManagementTimingTime);
                var result = Domain.LiteMeetingManagementTiming.Update(previousMeetingManagementTiming);
            }
            else
            {
                //liteMeetingManagementTiming.SortOrder = Domain.LiteMeetingManagementTiming.GetMaxSortOrder(liteMeetingManagementTiming) + 1;
            }

            var validations = Domain.LiteMeetingManagementTiming.UpdateValidation(liteMeetingManagementTiming);
            if (validations.Count() == 0)
            {
                var checkSortOrder = Uow.LiteMeetingManagement.Repository<LiteMeetingManagementTiming>().FindBy(a => a.NegotiationPhaseId == liteMeetingManagementTiming.NegotiationPhaseId && a.LiteMeetingManagementTimingId == liteMeetingManagementTiming.LiteMeetingManagementTimingId);
                if (checkSortOrder.Count() == 0)
                {
                    liteMeetingManagementTiming.SortOrder = Domain.LiteMeetingManagementTiming.GetMaxSortOrder(liteMeetingManagementTiming) + 1;
                }

                var result = Domain.LiteMeetingManagementTiming.Update(liteMeetingManagementTiming);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.LiteMeetingManagementTiming.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.LiteMeetingManagementTiming.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
