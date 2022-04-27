
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
	[Route("api/[controller]")]
    public class LiteProjectBackgroundsController : BaseController
    {
        
        public LiteProjectBackgroundsController(ILiteProjectBackgroundUow liteProjectBackgroundUow, ILiteProjectBackgroundDomain liteProjectBackgroundDomain)
        {
            Uow.LiteProjectBackground = liteProjectBackgroundUow;
            Domain.LiteProjectBackground = liteProjectBackgroundDomain;
        }
		
		[HttpGet]
		public IActionResult Get() => Ok(Domain.LiteProjectBackground.Get());

		//[HttpGet("{id}")]
		//public IActionResult Get(int id) => Ok(Uow.LiteProjectBackground.Repository<LiteProjectBackground>().FindByInclude(t => t.LiteProjectBackgroundId == id, x => x.LiteBackgroundCommunicationModes).SingleOrDefault());


		[HttpGet("{id}")]
		public IActionResult Get(int id) => Ok(Domain.LiteProjectBackground.Get(id));

		[HttpPost]
        public IActionResult Post([FromBody]LiteProjectBackground liteProjectBackground)
        {
          
            var validations = Domain.LiteProjectBackground.AddValidation(liteProjectBackground);
            if (validations.Count() == 0) {
                var result = Domain.LiteProjectBackground.Add(liteProjectBackground);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteProjectBackground liteProjectBackground)
        {
            var validations = Domain.LiteProjectBackground.UpdateValidation(liteProjectBackground);
            if (validations.Count() == 0) {
                var result = Domain.LiteProjectBackground.Update(liteProjectBackground);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.LiteProjectBackground.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.LiteProjectBackground.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
