
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectPowerModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectPowersController : BaseController
    {
        
        public ProjectPowersController(IProjectPowerUow projectPowerUow, IProjectPowerDomain projectPowerDomain)
        {
            Uow.ProjectPower = projectPowerUow;
            Domain.ProjectPower = projectPowerDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectPower.Repository<ProjectPower>().All());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(Uow.ProjectPower.Repository<ProjectPower>().FindByInclude(t => t.ProjectPowerId == id, x => x.PowerTypeDetails).SingleOrDefault());

        [HttpPost]
        public IActionResult Post([FromBody]ProjectPower projectPower)
        {
          
            var validations = Domain.ProjectPower.AddValidation(projectPower);
            if (validations.Count() == 0) {
                var result = Domain.ProjectPower.Add(projectPower);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectPower projectPower)
        {
            var validations = Domain.ProjectPower.UpdateValidation(projectPower);
            if (validations.Count() == 0) {
                var result = Domain.ProjectPower.Update(projectPower);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectPower.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectPower.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
