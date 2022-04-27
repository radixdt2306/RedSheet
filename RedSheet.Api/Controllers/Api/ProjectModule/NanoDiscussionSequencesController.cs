
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectModuleModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.ProjectModuleControllers
{

    [Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class NanoDiscussionSequencesController : BaseController
    {

        public NanoDiscussionSequencesController(IProjectModuleUow projectModuleUow, INanoDiscussionSequenceDomain nanoDiscussionSequenceDomain)
        {
            Uow.ProjectModule = projectModuleUow;
            Domain.NanoDiscussionSequence = nanoDiscussionSequenceDomain;
        }


        public IActionResult Get(int projectModuleId) => Ok(Domain.NanoDiscussionSequence.Get(projectModuleId));

        [HttpGet("{id}")]
        public IActionResult Get(int projectModuleId, int id) => Ok(Domain.NanoDiscussionSequence.Get(projectModuleId, id));

        [HttpPost]
        public IActionResult Post([FromBody]NanoDiscussionSequence nanoDiscussionSequence)
        {
            nanoDiscussionSequence.SortOrder = Domain.NanoDiscussionSequence.GetMaxSortOrder(nanoDiscussionSequence) + 1;
            var validations = Domain.NanoDiscussionSequence.AddValidation(nanoDiscussionSequence);
            if (validations.Count() == 0)
            {
                var result = Domain.NanoDiscussionSequence.Add(nanoDiscussionSequence);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody]NanoDiscussionSequence nanoDiscussionSequence)
        //{
        //    var validations = Domain.NanoDiscussionSequence.UpdateValidation(nanoDiscussionSequence);
        //    if (validations.Count() == 0) {
        //        var result = Domain.NanoDiscussionSequence.Update(nanoDiscussionSequence);
        //        return Ok(result);
        //    }
        //    return BadRequest(validations);
        //}

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]NanoDiscussionSequence nanoDiscussionSequence)
        {

            if (nanoDiscussionSequence.previousNanoDiscussionSequenceId != 0)
            {
                var previousNanoDiscussionSequence = Uow.ProjectModule.Repository<NanoDiscussionSequence>().FindByKey(nanoDiscussionSequence.previousNanoDiscussionSequenceId);
                previousNanoDiscussionSequence.NanoDiscussionSequenceId = nanoDiscussionSequence.previousNanoDiscussionSequenceId;
                previousNanoDiscussionSequence.SortOrder = nanoDiscussionSequence.previousNanoDiscussionSequenceSortOrder;
                previousNanoDiscussionSequence.Time = TimeSpan.Parse(nanoDiscussionSequence.previousNanoDiscussionSequenceTime);
                var result = Domain.NanoDiscussionSequence.Update(previousNanoDiscussionSequence);
            }
            else
            {
                //nanoDiscussionSequence.SortOrder = Domain.NanoDiscussionSequence.GetMaxSortOrder(nanoDiscussionSequence) + 1;
            }

            var validations = Domain.NanoDiscussionSequence.UpdateValidation(nanoDiscussionSequence);
            if (validations.Count() == 0)
            {
                var checkSortOrder = Uow.ProjectModule.Repository<NanoDiscussionSequence>().FindBy(a => a.NegotiationPhaseId == nanoDiscussionSequence.NegotiationPhaseId && a.NanoDiscussionSequenceId == nanoDiscussionSequence.NanoDiscussionSequenceId);
                if (checkSortOrder.Count() == 0)
                {
                    nanoDiscussionSequence.SortOrder = Domain.NanoDiscussionSequence.GetMaxSortOrder(nanoDiscussionSequence) + 1;
                }
                var result = Domain.NanoDiscussionSequence.Update(nanoDiscussionSequence);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.NanoDiscussionSequence.DeleteValidation(id);
            if (validations.Count() == 0)
            {
                Domain.NanoDiscussionSequence.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
