
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.LiteProjectBackgroundModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.LiteProjectBackgroundControllers
{
    [TypeFilter(typeof(ProjectUpdate))]
    [Route("api/liteprojectbackgrounds/{liteProjectBackgroundId}/[controller]")]
    public class LiteTheirTeamMembersController : BaseController
    {
        
        public LiteTheirTeamMembersController(ILiteProjectBackgroundUow liteProjectBackgroundUow, ILiteTheirTeamMemberDomain liteTheirTeamMemberDomain)
        {
            Uow.LiteProjectBackground = liteProjectBackgroundUow;
            Domain.LiteTheirTeamMember = liteTheirTeamMemberDomain;
        }

        
		public IActionResult Get(int liteProjectBackgroundId) => Ok(Domain.LiteTheirTeamMember.Get(liteProjectBackgroundId));

        [HttpGet("{id}")]
        public IActionResult   Get(int liteProjectBackgroundId, int id)  => Ok(Domain.LiteTheirTeamMember.  Get(liteProjectBackgroundId,id) );

        [HttpPost]
        public IActionResult Post([FromBody]LiteTheirTeamMember liteTheirTeamMember)
        {
          
            var validations = Domain.LiteTheirTeamMember.AddValidation(liteTheirTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.LiteTheirTeamMember.Add(liteTheirTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteTheirTeamMember liteTheirTeamMember)
        {
            var validations = Domain.LiteTheirTeamMember.UpdateValidation(liteTheirTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.LiteTheirTeamMember.Update(liteTheirTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.LiteTheirTeamMember.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.LiteTheirTeamMember.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
