using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
namespace RedSheet.Api.Controllers
{
	[Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class ProjectZomasController : BaseController
    {
        public ProjectZomasController(IProjectModuleUow projectModuleUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectModule = projectModuleUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectModuleId) => Ok(Uow.ProjectModule.Repository<ProjectZoma>().FindBy(t=> t.ProjectModuleId == projectModuleId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectModuleId, int id)  => Ok(Uow.ProjectModule.Repository<ProjectZoma>().SingleOrDefault(t => t.ProjectZomaId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectZoma projectZoma)
        {
            Uow.ProjectModule.RegisterNew<ProjectZoma>(projectZoma);
            Uow.ProjectModule.Commit();
            return Ok(projectZoma);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectZoma projectZoma)
        {
            Uow.ProjectModule.RegisterDirty<ProjectZoma>(projectZoma);
            Uow.ProjectModule.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var projectZoma = Uow.ProjectModule.Repository<ProjectZoma>().FindByKey(id);
            Uow.ProjectModule.RegisterDeleted<ProjectZoma>(projectZoma);
            Uow.ProjectModule.Commit();
            return NoContent();
        }
    }
}