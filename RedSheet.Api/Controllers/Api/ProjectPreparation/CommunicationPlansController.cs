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
	[Route("api/projectpreparations/{projectPreparationId}/[controller]")]
    public class CommunicationPlansController : BaseController
    {
        public CommunicationPlansController(IProjectPreparationUow projectPreparationUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectPreparation = projectPreparationUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectPreparationId) => Ok(Uow.ProjectPreparation.Repository<vCommunicationPlan>().FindBy(t=> t.ProjectPreparationId == projectPreparationId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectPreparationId, int id)  => Ok(Uow.ProjectPreparation.Repository<vCommunicationPlanRecord>().SingleOrDefault(t => t.CommunicationPlanId == id));

        [HttpPost]
        public IActionResult Post([FromBody]CommunicationPlan communicationPlan)
        {
            Uow.ProjectPreparation.RegisterNew<CommunicationPlan>(communicationPlan);
            Uow.ProjectPreparation.Commit();
            return Ok(communicationPlan);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]CommunicationPlan communicationPlan)
        {
            Uow.ProjectPreparation.RegisterDirty<CommunicationPlan>(communicationPlan);
            Uow.ProjectPreparation.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var communicationPlan = Uow.ProjectPreparation.Repository<CommunicationPlan>().FindByKey(id);
            Uow.ProjectPreparation.RegisterDeleted<CommunicationPlan>(communicationPlan);
            Uow.ProjectPreparation.Commit();
            return NoContent();
        }
    }
}