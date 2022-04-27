
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
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.ProjectModuleControllers
{
    [TypeFilter(typeof(LockRecordFilter))]
    [TypeFilter(typeof(ProjectUpdate))]
    [Route("api/[controller]")]
    public class ProjectModulesController : BaseController
    {
        
        public ProjectModulesController(IProjectModuleUow projectModuleUow, IProjectModuleDomain projectModuleDomain)
        {
            Uow.ProjectModule = projectModuleUow;
            Domain.ProjectModule = projectModuleDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Domain.ProjectModule.Get());

        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Domain.ProjectModule. Get(id)  );

        [HttpPost]
        public IActionResult Post([FromBody]ProjectModule projectModule)
        {
          
            var validations = Domain.ProjectModule.AddValidation(projectModule);
            if (validations.Count() == 0) {
                var result = Domain.ProjectModule.Add(projectModule);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectModule projectModule)
        {
            var validations = Domain.ProjectModule.UpdateValidation(projectModule);
            if (validations.Count() == 0) {
                var result = Domain.ProjectModule.Update(projectModule);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectModule.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectModule.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
