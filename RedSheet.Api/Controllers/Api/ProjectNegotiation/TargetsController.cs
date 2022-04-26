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
	[Route("api/projectnegotiations/{projectNegotiationId}/[controller]")]
    public class TargetsController : BaseController
    {
        public TargetsController(IProjectNegotiationUow projectNegotiationUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectNegotiation = projectNegotiationUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectNegotiationId) => Ok(Uow.ProjectNegotiation.Repository<vTarget>().FindBy(t=> t.ProjectNegotiationId == projectNegotiationId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectNegotiationId, int id)  => Ok(Uow.ProjectNegotiation.Repository<vTargetRecord>().SingleOrDefault(t => t.TargetId == id));

        [HttpPost]
        public IActionResult Post([FromBody]Target target)
        {
            Uow.ProjectNegotiation.RegisterNew<Target>(target);
            Uow.ProjectNegotiation.Commit();
            return Ok(target);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Target target)
        {
            Uow.ProjectNegotiation.RegisterDirty<Target>(target);
            Uow.ProjectNegotiation.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var target = Uow.ProjectNegotiation.Repository<Target>().FindByKey(id);
            Uow.ProjectNegotiation.RegisterDeleted<Target>(target);
            Uow.ProjectNegotiation.Commit();
            return NoContent();
        }
    }
}