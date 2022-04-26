
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
    public class LiteOurTeamMembersController : BaseController
    {
        
        public LiteOurTeamMembersController(ILiteProjectBackgroundUow liteProjectBackgroundUow, ILiteOurTeamMemberDomain liteOurTeamMemberDomain)
        {
            Uow.LiteProjectBackground = liteProjectBackgroundUow;
            Domain.LiteOurTeamMember = liteOurTeamMemberDomain;
        }

        
		public IActionResult Get(int liteProjectBackgroundId) => Ok(Domain.LiteOurTeamMember.Get(liteProjectBackgroundId));

        [HttpGet("{id}")]
        public IActionResult   Get(int liteProjectBackgroundId, int id)  => Ok(Domain.LiteOurTeamMember.  Get(liteProjectBackgroundId,id) );

        [HttpPost]
        public IActionResult Post([FromBody]LiteOurTeamMember liteOurTeamMember)
        {
          
            var validations = Domain.LiteOurTeamMember.AddValidation(liteOurTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.LiteOurTeamMember.Add(liteOurTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteOurTeamMember liteOurTeamMember)
        {
            var validations = Domain.LiteOurTeamMember.UpdateValidation(liteOurTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.LiteOurTeamMember.Update(liteOurTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.LiteOurTeamMember.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.LiteOurTeamMember.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
