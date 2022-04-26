
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.NanoScopeToNegotiateObjectiveModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.NanoScopeToNegotiateObjectiveControllers
{
    [TypeFilter(typeof(ProjectUpdate))]
    [Route("api/[controller]")]
    public class NanoScopeToNegotiateObjectivesController : BaseController
    {
        
        public NanoScopeToNegotiateObjectivesController(INanoScopeToNegotiateObjectiveUow nanoScopeToNegotiateObjectiveUow, INanoScopeToNegotiateObjectiveDomain nanoScopeToNegotiateObjectiveDomain)
        {
            Uow.NanoScopeToNegotiateObjective = nanoScopeToNegotiateObjectiveUow;
            Domain.NanoScopeToNegotiateObjective = nanoScopeToNegotiateObjectiveDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Domain.NanoScopeToNegotiateObjective.Get());

		//[HttpGet("{id}")]
		//public IActionResult Get(int id) => Ok(Uow.ProjectStakeholder.Repository<NanoScopeToNegotiateObjective>().FindByInclude(t => t.NanoScopeToNegotiateObjectiveId == id, x => x.NanoScopeToNegotiateCommunicationModes,x => x.NanoRelationshipRequire,x =>x.NanoScopeToNegotiate,x=> x.ValueObjective).SingleOrDefault());


		[HttpGet("{id}")]
		public IActionResult Get(int id) => Ok(Domain.NanoScopeToNegotiateObjective.Get(id));

		[HttpPost]
        public IActionResult Post([FromBody]NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective)
        {
          
            var validations = Domain.NanoScopeToNegotiateObjective.AddValidation(nanoScopeToNegotiateObjective);
            if (validations.Count() == 0) {
                var result = Domain.NanoScopeToNegotiateObjective.Add(nanoScopeToNegotiateObjective);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]NanoScopeToNegotiateObjective nanoScopeToNegotiateObjective)
        {
            var validations = Domain.NanoScopeToNegotiateObjective.UpdateValidation(nanoScopeToNegotiateObjective);
            if (validations.Count() == 0) {
                var result = Domain.NanoScopeToNegotiateObjective.Update(nanoScopeToNegotiateObjective);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.NanoScopeToNegotiateObjective.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.NanoScopeToNegotiateObjective.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
