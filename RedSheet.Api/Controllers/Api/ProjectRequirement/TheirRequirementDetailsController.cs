
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
    public class TheirRequirementDetailsController : BaseController
    {
        
        public TheirRequirementDetailsController(IProjectRequirementUow projectRequirementUow, ITheirRequirementDetailDomain theirRequirementDetailDomain)
        {
            Uow.ProjectRequirement = projectRequirementUow;
            Domain.TheirRequirementDetail = theirRequirementDetailDomain;
        }

        
		public IActionResult Get(int projectRequirementId) => Ok(Uow.ProjectRequirement.Repository<vTheirRequirementDetail>().FindBy(t=> t.ProjectRequirementId == projectRequirementId));

        [HttpGet("{id}")]
        public IActionResult   Get(int projectRequirementId, int id)  => Ok(Uow.ProjectRequirement.Repository<vTheirRequirementDetailRecord>().SingleOrDefault(t => t.TheirRequirementDetailId == id));

        [HttpPost]
        public IActionResult Post([FromBody]TheirRequirementDetail theirRequirementDetail)
        {
            theirRequirementDetail.SortOrder = Domain.TheirRequirementDetail.GetMaxSortOrder(theirRequirementDetail) + 1;
            var validations = Domain.TheirRequirementDetail.AddValidation(theirRequirementDetail);
            if (validations.Count() == 0) {
                var result = Domain.TheirRequirementDetail.Add(theirRequirementDetail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]TheirRequirementDetail theirRequirementDetail)
        {
            //var validations = Domain.TheirRequirementDetail.UpdateValidation(theirRequirementDetail);
            //if (validations.Count() == 0) {
            //    var result = Domain.TheirRequirementDetail.Update(theirRequirementDetail);
            //    return Ok(result);
            //}
            //return BadRequest(validations);

            if (theirRequirementDetail.previousTheirRequirementId != 0)
            {
                var previousTheirRequreimentDetail = Uow.ProjectRequirement.Repository<TheirRequirementDetail>().FindByKey(theirRequirementDetail.previousTheirRequirementId);
                previousTheirRequreimentDetail.TheirRequirementDetailId = theirRequirementDetail.previousTheirRequirementId;
                previousTheirRequreimentDetail.SortOrder = theirRequirementDetail.previousTheirRequirementDetailSortOrder;                
                var result = Domain.TheirRequirementDetail.Update(previousTheirRequreimentDetail);
            }            
            var validations = Domain.TheirRequirementDetail.UpdateValidation(theirRequirementDetail);
            if (validations.Count() == 0)
            {
                var result = Domain.TheirRequirementDetail.Update(theirRequirementDetail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.TheirRequirementDetail.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.TheirRequirementDetail.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
