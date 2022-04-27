
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectCultureModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectCulturesController : BaseController
    {
        
        public ProjectCulturesController(IProjectCultureUow projectCultureUow, IProjectCultureDomain projectCultureDomain)
        {
            Uow.ProjectCulture = projectCultureUow;
            Domain.ProjectCulture = projectCultureDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectCulture.Repository<ProjectCulture>().All());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(Uow.ProjectCulture.Repository<ProjectCulture>().FindByInclude(t => t.ProjectCultureId == id,x=>x.Cultures).SingleOrDefault());

        [HttpPost]
        public IActionResult Post([FromBody]ProjectCulture projectCulture)
        {
          
            var validations = Domain.ProjectCulture.AddValidation(projectCulture);
            if (validations.Count() == 0) {
                var result = Domain.ProjectCulture.Add(projectCulture);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectCulture projectCulture)
        {
            var validations = Domain.ProjectCulture.UpdateValidation(projectCulture);
            if (validations.Count() == 0) {
                var result = Domain.ProjectCulture.Update(projectCulture);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectCulture.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectCulture.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
