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
    [Route("api/projectbackgrounds/{projectBackgroundId}/[controller]")]
    public class LongTermObjectivesController : BaseController
    {
        public LongTermObjectivesController(IProjectBackgroundUow projectBackgroundUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectBackground = projectBackgroundUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectBackgroundId) => Ok(Uow.ProjectBackground.Repository<vLongTermObjective>().FindBy(t=> t.ProjectBackgroundId == projectBackgroundId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectBackgroundId, int id)  => Ok(Uow.ProjectBackground.Repository<vLongTermObjectiveRecord>().SingleOrDefault(t => t.LongTermObjectiveId == id));

        [HttpPost]
        public IActionResult Post([FromBody]LongTermObjective longTermObjective)
        {
            Uow.ProjectBackground.RegisterNew<LongTermObjective>(longTermObjective);
            Uow.ProjectBackground.Commit();
            return Ok(longTermObjective);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LongTermObjective longTermObjective)
        {
            Uow.ProjectBackground.RegisterDirty<LongTermObjective>(longTermObjective);
            Uow.ProjectBackground.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var longTermObjective = Uow.ProjectBackground.Repository<LongTermObjective>().FindByKey(id);
            Uow.ProjectBackground.RegisterDeleted<LongTermObjective>(longTermObjective);
            Uow.ProjectBackground.Commit();
            return NoContent();
        }
    }
}