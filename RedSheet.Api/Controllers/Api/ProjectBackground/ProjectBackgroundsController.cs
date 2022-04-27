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
    public class ProjectBackgroundsController : BaseController
    {
        public ProjectBackgroundsController(IProjectBackgroundUow projectBackgroundUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectBackground = projectBackgroundUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectBackground.Repository<ProjectBackground>().All());


        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Uow.ProjectBackground.Repository<ProjectBackground>().SingleOrDefault(t => t.ProjectBackgroundId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectBackground projectBackground)
        {
            Uow.ProjectBackground.RegisterNew<ProjectBackground>(projectBackground);
            Uow.ProjectBackground.Commit();
            return Ok(projectBackground);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectBackground projectBackground)
        {
            Uow.ProjectBackground.RegisterDirty<ProjectBackground>(projectBackground);
            Uow.ProjectBackground.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var projectBackground = Uow.ProjectBackground.Repository<ProjectBackground>().FindByKey(id);
            Uow.ProjectBackground.RegisterDeleted<ProjectBackground>(projectBackground);
            Uow.ProjectBackground.Commit();
            return NoContent();
        }
    }
}