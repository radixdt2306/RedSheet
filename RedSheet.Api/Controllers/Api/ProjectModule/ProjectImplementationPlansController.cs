
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectModuleModule;
using RedSheet.BoundedContext;

namespace RedSheet.Api.Controllers.ProjectModuleControllers
{
	[Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class ProjectImplementationPlansController : BaseController
    {
        
        public ProjectImplementationPlansController(IProjectModuleUow projectModuleUow, IProjectImplementationPlanDomain projectImplementationPlanDomain)
        {
            Uow.ProjectModule = projectModuleUow;
            Domain.ProjectImplementationPlan = projectImplementationPlanDomain;
        }

        
		public IActionResult Get(int projectModuleId) => Ok(Domain.ProjectImplementationPlan.Get(projectModuleId));

        [HttpGet("{id}")]
        public IActionResult   Get(int projectModuleId, int id)  => Ok(Domain.ProjectImplementationPlan.  Get(projectModuleId,id) );

        [HttpPost]
        public IActionResult Post([FromBody]ProjectImplementationPlan projectImplementationPlan)
        {
          
            var validations = Domain.ProjectImplementationPlan.AddValidation(projectImplementationPlan);
            if (validations.Count() == 0) {
                var result = Domain.ProjectImplementationPlan.Add(projectImplementationPlan);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectImplementationPlan projectImplementationPlan)
        {
            var validations = Domain.ProjectImplementationPlan.UpdateValidation(projectImplementationPlan);
            if (validations.Count() == 0) {
                var result = Domain.ProjectImplementationPlan.Update(projectImplementationPlan);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectImplementationPlan.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectImplementationPlan.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
