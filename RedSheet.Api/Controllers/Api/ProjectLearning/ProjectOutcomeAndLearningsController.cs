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
	[Route("api/[controller]")]
    public class ProjectOutcomeAndLearningsController : BaseController
    {
        public ProjectOutcomeAndLearningsController(IProjectLearningUow projectLearningUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectLearning = projectLearningUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get() => Ok(Uow.ProjectLearning.Repository<vProjectOutcomeAndLearning>().All());


        [HttpGet("{id}")]
        ////public IActionResult  Get(int id)   => Ok(Uow.ProjectLearning.Repository<vProjectOutcomeAndLearningRecord>().SingleOrDefault(t => t.ProjectOutcomeAndLearningId == id));
        public IActionResult Get(int id) => Ok(Uow.ProjectLearning.Repository<vProjectOutcomeAndLearningRecord>().FindBy(t => t.ProjectModuleId == id));

        [HttpPost]
        public IActionResult Post([FromBody]ProjectOutcomeAndLearning projectOutcomeAndLearning)
        {
            Uow.ProjectLearning.RegisterNew<ProjectOutcomeAndLearning>(projectOutcomeAndLearning);
            Uow.ProjectLearning.Commit();
            return Ok(projectOutcomeAndLearning);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProjectOutcomeAndLearning projectOutcomeAndLearning)
        {
            Uow.ProjectLearning.RegisterDirty<ProjectOutcomeAndLearning>(projectOutcomeAndLearning);
            Uow.ProjectLearning.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var projectOutcomeAndLearning = Uow.ProjectLearning.Repository<ProjectOutcomeAndLearning>().FindByKey(id);
            Uow.ProjectLearning.RegisterDeleted<ProjectOutcomeAndLearning>(projectOutcomeAndLearning);
            Uow.ProjectLearning.Commit();
            return NoContent();
        }
    }
}