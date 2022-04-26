
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectNegotionalityModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectNegotionalitiesController : BaseController
    {
        
        public ProjectNegotionalitiesController(IProjectNegotionalityUow projectNegotionalityUow, IProjectNegotionalityDomain projectNegotionalityDomain)
        {
            Uow.ProjectNegotionality = projectNegotionalityUow;
            Domain.ProjectNegotionality = projectNegotionalityDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectNegotionality.Repository<ProjectNegotionality>().All());

        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Uow.ProjectNegotionality.Repository<ProjectNegotionality>().FindByInclude(t => t.ProjectNegotionalityId == id,x=>x.OurTeamMembers).SingleOrDefault());

        [HttpPost]
        public IActionResult Post([FromBody]ProjectNegotionality projectNegotionality)
        {
          
            var validations = Domain.ProjectNegotionality.AddValidation(projectNegotionality);
            if (validations.Count() == 0) {
                var result = Domain.ProjectNegotionality.Add(projectNegotionality);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectNegotionality projectNegotionality)
        {
            var validations = Domain.ProjectNegotionality.UpdateValidation(projectNegotionality);
            if (validations.Count() == 0) {
                var result = Domain.ProjectNegotionality.Update(projectNegotionality);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectNegotionality.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectNegotionality.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
