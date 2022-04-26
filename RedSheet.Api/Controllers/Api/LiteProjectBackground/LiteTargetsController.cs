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
    [Route("api/liteprojectbackgrounds/{liteProjectBackgroundId}/[controller]")]
    public class LiteTargetsController : BaseController
    {
        public LiteTargetsController(ILiteProjectBackgroundUow liteProjectBackgroundUow, IApplicationUtility applicationUtility)
        {
            Uow.LiteProjectBackground = liteProjectBackgroundUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int liteProjectBackgroundId) => Ok(Uow.LiteProjectBackground.Repository<vLiteTarget>().FindBy(t=> t.LiteProjectBackgroundId == liteProjectBackgroundId));


        [HttpGet("{id}")]
        public IActionResult   Get(int liteProjectBackgroundId, int id)  => Ok(Uow.LiteProjectBackground.Repository<vLiteTargetRecord>().SingleOrDefault(t => t.LiteTargetId == id));

        [HttpPost]
        public IActionResult Post([FromBody]LiteTarget liteTarget)
        {
            Uow.LiteProjectBackground.RegisterNew<LiteTarget>(liteTarget);
            Uow.LiteProjectBackground.Commit();
            return Ok(liteTarget);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteTarget liteTarget)
        {
            Uow.LiteProjectBackground.RegisterDirty<LiteTarget>(liteTarget);
            Uow.LiteProjectBackground.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var liteTarget = Uow.LiteProjectBackground.Repository<LiteTarget>().FindByKey(id);
            Uow.LiteProjectBackground.RegisterDeleted<LiteTarget>(liteTarget);
            Uow.LiteProjectBackground.Commit();
            return NoContent();
        }
    }
}