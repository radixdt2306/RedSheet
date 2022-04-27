
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ScheduleEmailsModule;
using RedSheet.BoundedContext;

namespace RedSheet.Api.Controllers.ScheduleEmailsControllers
{
    [Route("api/[controller]")]
    public class ScheduleEmailsController : BaseController
    {
        
        public ScheduleEmailsController(IScheduleEmailUow scheduleEmailsUow, IScheduleEmailDomain scheduleEmailDomain)
        {
            Uow.ScheduleEmail = scheduleEmailsUow;
            Domain.ScheduleEmail = scheduleEmailDomain;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Domain.ScheduleEmail.Get());

        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Domain.ScheduleEmail. Get(id)  );

        [HttpPost]
        public IActionResult Post([FromBody]ScheduleEmail scheduleEmail)
        {
          
            var validations = Domain.ScheduleEmail.AddValidation(scheduleEmail);
            if (validations.Count() == 0) {
                var result = Domain.ScheduleEmail.Add(scheduleEmail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ScheduleEmail scheduleEmail)
        {
            var validations = Domain.ScheduleEmail.UpdateValidation(scheduleEmail);
            if (validations.Count() == 0) {
                var result = Domain.ScheduleEmail.Update(scheduleEmail);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ScheduleEmail.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ScheduleEmail.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
