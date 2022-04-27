
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

namespace RedSheet.Api.Controllers.ProjectNegotiationControllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projectnegotiations/{projectNegotiationId}/[controller]")]
    public class TheirTeamMembersController : BaseController
    {
        
        public TheirTeamMembersController(IProjectNegotiationUow projectNegotiationUow, ITheirTeamMemberDomain theirTeamMemberDomain)
        {
            Uow.ProjectNegotiation = projectNegotiationUow;
            Domain.TheirTeamMember = theirTeamMemberDomain;
        }

        
		public IActionResult Get(int projectNegotiationId) => Ok(Domain.TheirTeamMember.Get(projectNegotiationId));

        [HttpGet("{id}")]
        public IActionResult   Get(int projectNegotiationId, int id)  => Ok(Domain.TheirTeamMember.  Get(projectNegotiationId,id) );

        [HttpPost]
        public IActionResult Post([FromBody]TheirTeamMember theirTeamMember)
        {
          
            var validations = Domain.TheirTeamMember.AddValidation(theirTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.TheirTeamMember.Add(theirTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]TheirTeamMember theirTeamMember)
        {
            var validations = Domain.TheirTeamMember.UpdateValidation(theirTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.TheirTeamMember.Update(theirTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.TheirTeamMember.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.TheirTeamMember.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
