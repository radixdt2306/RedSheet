using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectGameModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;
using RedSheet.DbEntities.ExtendedModels;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectGameDetailsController : BaseController
    {
        
        public ProjectGameDetailsController(IProjectGameUow projectGameUow, IProjectGameDetailDomain projectGameDetailDomain)
        {
            Uow.ProjectGame = projectGameUow;
            Domain.ProjectGameDetail = projectGameDetailDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectGame.Repository<ProjectGameDetail>().All());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(Uow.ProjectGame.Repository<ProjectGameDetail>().FindByInclude(t => t.ProjectGameDetailId == id, x => x.Games).SingleOrDefault());

        [HttpPost]
        public IActionResult Post([FromBody]ProjectGameDetail projectGameDetail)
        {
          
            var validations = Domain.ProjectGameDetail.AddValidation(projectGameDetail);
            if (validations.Count() == 0) {
                var result = Domain.ProjectGameDetail.Add(projectGameDetail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectGameDetail projectGameDetail)
        {
            var validations = Domain.ProjectGameDetail.UpdateValidation(projectGameDetail);
            if (validations.Count() == 0) {
                var result = Domain.ProjectGameDetail.Update(projectGameDetail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectGameDetail.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectGameDetail.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
