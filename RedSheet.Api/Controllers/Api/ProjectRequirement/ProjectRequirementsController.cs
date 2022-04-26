
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectRequirementModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{				  
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectRequirementsController : BaseController
    {
        
        public ProjectRequirementsController(IProjectRequirementUow projectRequirementUow, IProjectRequirementDomain projectRequirementDomain)
        {
            Uow.ProjectRequirement = projectRequirementUow;
            Domain.ProjectRequirement = projectRequirementDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectRequirement.Repository<ProjectRequirement>().All());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(Uow.ProjectRequirement.Repository<ProjectRequirement>().FindByInclude(t => t.ProjectRequirementId == id, x => x.OurRequirementDetails, x => x.TheirRequirementDetails,x=>x.Ourbatnas,x=>x.TheirBatnas));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectRequirement projectRequirement)
        {
          
            var validations = Domain.ProjectRequirement.AddValidation(projectRequirement);
            if (validations.Count() == 0) {
                var result = Domain.ProjectRequirement.Add(projectRequirement);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectRequirement projectRequirement)
        {
            var validations = Domain.ProjectRequirement.UpdateValidation(projectRequirement);
            if (validations.Count() == 0) {
                var result = Domain.ProjectRequirement.Update(projectRequirement);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectRequirement.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectRequirement.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
