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
    [Route("api/nanoscopetonegotiateobjectives/{nanoScopeToNegotiateObjectiveId}/[controller]")]
    public class NanoOurObjectivesController : BaseController
    {
        public NanoOurObjectivesController(INanoScopeToNegotiateObjectiveUow nanoScopeToNegotiateObjectiveUow, IApplicationUtility applicationUtility)
        {
            Uow.NanoScopeToNegotiateObjective = nanoScopeToNegotiateObjectiveUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int nanoScopeToNegotiateObjectiveId) => Ok(Uow.NanoScopeToNegotiateObjective.Repository<vNanoOurObjective>().FindBy(t=> t.NanoScopeToNegotiateObjectiveId == nanoScopeToNegotiateObjectiveId));


        [HttpGet("{id}")]
        public IActionResult   Get(int nanoScopeToNegotiateObjectiveId, int id)  => Ok(Uow.NanoScopeToNegotiateObjective.Repository<vNanoOurObjectiveRecord>().SingleOrDefault(t => t.NanoOurObjectiveId == id));

        [HttpPost]
        public IActionResult Post([FromBody]NanoOurObjective nanoOurObjective)
        {
            Uow.NanoScopeToNegotiateObjective.RegisterNew<NanoOurObjective>(nanoOurObjective);
            Uow.NanoScopeToNegotiateObjective.Commit();
            return Ok(nanoOurObjective);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]NanoOurObjective nanoOurObjective)
        {
            Uow.NanoScopeToNegotiateObjective.RegisterDirty<NanoOurObjective>(nanoOurObjective);
            Uow.NanoScopeToNegotiateObjective.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var nanoOurObjective = Uow.NanoScopeToNegotiateObjective.Repository<NanoOurObjective>().FindByKey(id);
            Uow.NanoScopeToNegotiateObjective.RegisterDeleted<NanoOurObjective>(nanoOurObjective);
            Uow.NanoScopeToNegotiateObjective.Commit();
            return NoContent();
        }
    }
}