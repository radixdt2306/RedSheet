
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectCulturePlanModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectCulturePlansController : BaseController
    {
        
        public ProjectCulturePlansController(IProjectCulturePlanUow projectCulturePlanUow, IProjectCulturePlanDomain projectCulturePlanDomain)
        {
            Uow.ProjectCulturePlan = projectCulturePlanUow;
            Domain.ProjectCulturePlan = projectCulturePlanDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectCulturePlan.Repository<ProjectCulturePlan>());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(Uow.ProjectCulturePlan.Repository<ProjectCulturePlan>().FindBy(t => t.ProjectModuleId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectCulturePlan projectCulturePlan)
        {
          
            var validations = Domain.ProjectCulturePlan.AddValidation(projectCulturePlan);
            if (validations.Count() == 0) {
                var result = Domain.ProjectCulturePlan.Add(projectCulturePlan);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectCulturePlan projectCulturePlan)
        {
            var validations = Domain.ProjectCulturePlan.UpdateValidation(projectCulturePlan);
            if (validations.Count() == 0) {
                var result = Domain.ProjectCulturePlan.Update(projectCulturePlan);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectCulturePlan.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectCulturePlan.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
