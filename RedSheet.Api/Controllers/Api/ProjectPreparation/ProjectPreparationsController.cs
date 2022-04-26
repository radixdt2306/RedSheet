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
    public class ProjectPreparationsController : BaseController
    {
        public ProjectPreparationsController(IProjectPreparationUow projectPreparationUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectPreparation = projectPreparationUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectPreparation.Repository<ProjectPreparation>().All());


        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Uow.ProjectPreparation.Repository<vProjectPreparationRecord>().SingleOrDefault(t => t.ProjectPreparationId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectPreparation projectPreparation)
        {
            Uow.ProjectPreparation.RegisterNew<ProjectPreparation>(projectPreparation);
            Uow.ProjectPreparation.Commit();
            return Ok(projectPreparation);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectPreparation projectPreparation)
        {
            Uow.ProjectPreparation.RegisterDirty<ProjectPreparation>(projectPreparation);
            Uow.ProjectPreparation.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var projectPreparation = Uow.ProjectPreparation.Repository<ProjectPreparation>().FindByKey(id);
            Uow.ProjectPreparation.RegisterDeleted<ProjectPreparation>(projectPreparation);
            Uow.ProjectPreparation.Commit();
            return NoContent();
        }
    }
}