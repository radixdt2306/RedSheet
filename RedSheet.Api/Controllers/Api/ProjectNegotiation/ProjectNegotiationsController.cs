
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectNegotiationModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/[controller]")]
    public class ProjectNegotiationsController : BaseController
    {
        
        public ProjectNegotiationsController(IProjectNegotiationUow projectNegotiationUow, IProjectNegotiationDomain projectNegotiationDomain)
        {
            Uow.ProjectNegotiation = projectNegotiationUow;
            Domain.ProjectNegotiation = projectNegotiationDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectNegotiation.Repository<ProjectNegotiation>().All());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(Uow.ProjectNegotiation.Repository<ProjectNegotiation>().FindByInclude(t => t.ProjectNegotiationId == id,x=>x.TheirTeamCommunicationModes).SingleOrDefault());

        [HttpPost]
        public IActionResult Post([FromBody]ProjectNegotiation projectNegotiation)
        {
          
            var validations = Domain.ProjectNegotiation.AddValidation(projectNegotiation);
            if (validations.Count() == 0) {
                var result = Domain.ProjectNegotiation.Add(projectNegotiation);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectNegotiation projectNegotiation)
        {
            var validations = Domain.ProjectNegotiation.UpdateValidation(projectNegotiation);
            if (validations.Count() == 0) {
                var result = Domain.ProjectNegotiation.Update(projectNegotiation);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ProjectNegotiation.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ProjectNegotiation.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
