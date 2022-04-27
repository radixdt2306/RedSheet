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
	[Route("api/projectrequirements/{projectRequirementId}/[controller]")]
    public class TheirBatnasController : BaseController
    {
        public TheirBatnasController(IProjectRequirementUow projectRequirementUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectRequirement = projectRequirementUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectRequirementId) => Ok(Uow.ProjectRequirement.Repository<TheirBatna>().FindBy(t=> t.ProjectRequirementId == projectRequirementId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectRequirementId, int id)  => Ok(Uow.ProjectRequirement.Repository<TheirBatna>().SingleOrDefault(t => t.TheirBatnaId == id));

        [HttpPost]
        public IActionResult Post([FromBody]TheirBatna theirBatna)
        {
            Uow.ProjectRequirement.RegisterNew<TheirBatna>(theirBatna);
            Uow.ProjectRequirement.Commit();
            return Ok(theirBatna);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]TheirBatna theirBatna)
        {
            Uow.ProjectRequirement.RegisterDirty<TheirBatna>(theirBatna);
            Uow.ProjectRequirement.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var theirBatna = Uow.ProjectRequirement.Repository<TheirBatna>().FindByKey(id);
            Uow.ProjectRequirement.RegisterDeleted<TheirBatna>(theirBatna);
            Uow.ProjectRequirement.Commit();
            return NoContent();
        }
    }
}