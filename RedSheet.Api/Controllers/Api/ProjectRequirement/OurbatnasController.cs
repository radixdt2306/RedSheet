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
	public class OurbatnasController : BaseController
	{
		public OurbatnasController(IProjectRequirementUow projectRequirementUow, IApplicationUtility applicationUtility)
		{
			Uow.ProjectRequirement = projectRequirementUow;
			ApplicationUtility = applicationUtility;
		}

		[HttpGet]
		public IActionResult Get(int projectRequirementId) => Ok(Uow.ProjectRequirement.Repository<Ourbatna>().FindBy(t => t.ProjectRequirementId == projectRequirementId));


		[HttpGet("{id}")]
		public IActionResult Get(int projectRequirementId, int id) => Ok(Uow.ProjectRequirement.Repository<Ourbatna>().SingleOrDefault(t => t.OurbatnaId == id));

		[HttpPost]
		public IActionResult Post([FromBody]Ourbatna ourbatna)
		{
			Uow.ProjectRequirement.RegisterNew<Ourbatna>(ourbatna);
			Uow.ProjectRequirement.Commit();
			return Ok(ourbatna);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]Ourbatna ourbatna)
		{
			Uow.ProjectRequirement.RegisterDirty<Ourbatna>(ourbatna);
			Uow.ProjectRequirement.Commit();
			return NoContent();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var ourbatna = Uow.ProjectRequirement.Repository<Ourbatna>().FindByKey(id);
			Uow.ProjectRequirement.RegisterDeleted<Ourbatna>(ourbatna);
			Uow.ProjectRequirement.Commit();
			return NoContent();
		}
	}
}