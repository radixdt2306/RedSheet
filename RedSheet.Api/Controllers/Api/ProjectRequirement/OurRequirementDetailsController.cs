
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectRequirementModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projectrequirements/{projectRequirementId}/[controller]")]
    public class OurRequirementDetailsController : BaseController
    {

        public OurRequirementDetailsController(IProjectRequirementUow projectRequirementUow, IOurRequirementDetailDomain ourRequirementDetailDomain)
        {
            Uow.ProjectRequirement = projectRequirementUow;
            Domain.OurRequirementDetail = ourRequirementDetailDomain;
        }


        public IActionResult Get(int projectRequirementId) => Ok(Uow.ProjectRequirement.Repository<vOurRequirementDetail>().FindBy(t => t.ProjectRequirementId == projectRequirementId));

        [HttpGet("{id}")]
        public IActionResult Get(int projectRequirementId, int id) => Ok(Uow.ProjectRequirement.Repository<vOurRequirementDetailRecord>().SingleOrDefault(t => t.OurRequirementDetailId == id));

        [HttpPost]
        public IActionResult Post([FromBody]OurRequirementDetail ourRequirementDetail)
        {

            var validations = Domain.OurRequirementDetail.AddValidation(ourRequirementDetail);
            if (validations.Count() == 0)
            {
                var result = Domain.OurRequirementDetail.Add(ourRequirementDetail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]OurRequirementDetail ourRequirementDetail)
        {
            var validations = Domain.OurRequirementDetail.UpdateValidation(ourRequirementDetail);
            if (validations.Count() == 0)
            {
                var result = Domain.OurRequirementDetail.Update(ourRequirementDetail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.OurRequirementDetail.DeleteValidation(id);
            if (validations.Count() == 0)
            {
                Domain.OurRequirementDetail.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
