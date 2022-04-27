
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectStakeholderModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projectmodules/{projectModuleId}/[controller]")]
    public class ProjectStakeholdersController : BaseController
    {
        
        public ProjectStakeholdersController(IProjectStakeholderUow projectStakeholderUow, IProjectStakeholderDomain projectStakeholderDomain,IAuditLog auditLog)
        {
            Uow.ProjectStakeholder = projectStakeholderUow;            

            Domain.ProjectStakeholder = projectStakeholderDomain;
        }

        
		[HttpGet]
		public IActionResult Get(int projectModuleId) => Ok(Uow.ProjectStakeholder.Repository<vProjectStakeholder>().FindBy(t=>t.ProjectModuleId == projectModuleId));

        [HttpGet("{id}")]
        public IActionResult Get(int projectModuleId,int id) => Ok(Uow.ProjectStakeholder.Repository<ProjectStakeholder>().FindByInclude(t => t.ProjectStakeholderId == id,x=> x.StakeholderCommunicationModes,x =>x.StakeholderType).SingleOrDefault()); 

        [HttpPost]
        public IActionResult Post([FromBody]ProjectStakeholder projectStakeholder)
        {
          
            var validations = Domain.ProjectStakeholder.AddValidation(projectStakeholder);
            if (validations.Count() == 0) {
                var result = Domain.ProjectStakeholder.Add(projectStakeholder);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectStakeholder projectStakeholder)
        {
            var validations = Domain.ProjectStakeholder.UpdateValidation(projectStakeholder);
            if (validations.Count() == 0) {
                var result = Domain.ProjectStakeholder.Update(projectStakeholder);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectStakeholder.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectStakeholder.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
