using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projectpowers/{projectPowerId}/[controller]")]
    public class KnowledgeGatheringPlansController : BaseController
    {
        public KnowledgeGatheringPlansController(IProjectPowerUow projectPowerUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectPower = projectPowerUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectPowerId) => Ok(Uow.ProjectPower.Repository<vKnowledgeGatheringPlan>().FindBy(t=> t.ProjectPowerId == projectPowerId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectPowerId, int id)  => Ok(Uow.ProjectPower.Repository<vKnowledgeGatheringPlanRecord>().SingleOrDefault(t => t.KnowledgeGatheringPlanId == id));

        [HttpPost]
        public IActionResult Post([FromBody]KnowledgeGatheringPlan knowledgeGatheringPlan)
        {
            Uow.ProjectPower.RegisterNew<KnowledgeGatheringPlan>(knowledgeGatheringPlan);
            Uow.ProjectPower.Commit();
            return Ok(knowledgeGatheringPlan);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]KnowledgeGatheringPlan knowledgeGatheringPlan)
        {
            Uow.ProjectPower.RegisterDirty<KnowledgeGatheringPlan>(knowledgeGatheringPlan);
            Uow.ProjectPower.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var knowledgeGatheringPlan = Uow.ProjectPower.Repository<KnowledgeGatheringPlan>().FindByKey(id);
            Uow.ProjectPower.RegisterDeleted<KnowledgeGatheringPlan>(knowledgeGatheringPlan);
            Uow.ProjectPower.Commit();
            return NoContent();
        }
    }
}