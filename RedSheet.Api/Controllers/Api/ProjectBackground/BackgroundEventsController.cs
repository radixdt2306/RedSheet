
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectBackgroundModule;
using RedSheet.BoundedContext;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers.ProjectBackgroundControllers
{
    [TypeFilter(typeof(ProjectUpdate))]
    [Route("api/projectbackgrounds/{projectBackgroundId}/[controller]")]
    public class BackgroundEventsController : BaseController
    {
        
        public BackgroundEventsController(IProjectBackgroundUow projectBackgroundUow, IBackgroundEventDomain backgroundEventDomain)
        {
            Uow.ProjectBackground = projectBackgroundUow;
            Domain.BackgroundEvent = backgroundEventDomain;
        }

        
		public IActionResult Get(int projectBackgroundId) => Ok(Domain.BackgroundEvent.Get(projectBackgroundId));

        [HttpGet("{id}")]
        public IActionResult   Get(int projectBackgroundId, int id)  => Ok(Domain.BackgroundEvent.  Get(projectBackgroundId,id) );

        [HttpPost]
        public IActionResult Post([FromBody]BackgroundEvent backgroundEvent)
        {
          
            var validations = Domain.BackgroundEvent.AddValidation(backgroundEvent);
            if (validations.Count() == 0) {
                var result = Domain.BackgroundEvent.Add(backgroundEvent);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]BackgroundEvent backgroundEvent)
        {
            var validations = Domain.BackgroundEvent.UpdateValidation(backgroundEvent);
            if (validations.Count() == 0) {
                var result = Domain.BackgroundEvent.Update(backgroundEvent);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.BackgroundEvent.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.BackgroundEvent.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
