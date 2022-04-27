
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
using System.Collections;
using Rx.Core.Security;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projectnegotionalities/{projectNegotionalityId}/[controller]")]
    public class OurTeamMembersController : BaseController
    {
        
        public OurTeamMembersController(IProjectNegotionalityUow projectNegotionalityUow, IOurTeamMemberDomain ourTeamMemberDomain)
        {
            Uow.ProjectNegotionality = projectNegotionalityUow;
            Domain.OurTeamMember = ourTeamMemberDomain;
        }


        //public IActionResult Get(int projectNegotionalityId) => Ok(Uow.ProjectNegotionality.Repository<OurTeamMember>().FindByInclude(t=> t.ProjectNegotionalityId == projectNegotionalityId, x => x.OurTeamMemberBehaviours, a => a.OurTeamMemberRequires));
        public IActionResult Get(int projectNegotionalityId) => Ok(Uow.ProjectNegotionality.Repository<vOurTeamMember>().FindBy(t => t.ProjectNegotionalityId == projectNegotionalityId));

        [HttpGet("{id}")]
        public IActionResult   Get(int projectNegotionalityId, int id)  => Ok(Uow.ProjectNegotionality.Repository<OurTeamMember>().FindByInclude(t => t.OurTeamMemberId == id, x => x.OurTeamMemberBehaviours).SingleOrDefault());

        [HttpPost]
        public IActionResult Post([FromBody]OurTeamMember ourTeamMember)
        {
            //var UserId = UserClaim.UserId;
            var validations = Domain.OurTeamMember.AddValidation(ourTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.OurTeamMember.Add(ourTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]OurTeamMember ourTeamMember)
        {
            var validations = Domain.OurTeamMember.UpdateValidation(ourTeamMember);
            if (validations.Count() == 0) {
                var result = Domain.OurTeamMember.Update(ourTeamMember);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.OurTeamMember.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.OurTeamMember.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
