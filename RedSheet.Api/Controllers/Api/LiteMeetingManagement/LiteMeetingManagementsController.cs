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
    public class LiteMeetingManagementsController : BaseController
    {
        public LiteMeetingManagementsController(ILiteMeetingManagementUow liteMeetingManagementUow, IApplicationUtility applicationUtility)
        {
            Uow.LiteMeetingManagement = liteMeetingManagementUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get() => Ok(Uow.LiteMeetingManagement.Repository<LiteMeetingManagement>().All());


        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Uow.LiteMeetingManagement.Repository<LiteMeetingManagement>().SingleOrDefault(t => t.LiteMeetingManagementId == id));

        [HttpPost]
        public IActionResult Post([FromBody]LiteMeetingManagement liteMeetingManagement)
        {
            Uow.LiteMeetingManagement.RegisterNew<LiteMeetingManagement>(liteMeetingManagement);
            Uow.LiteMeetingManagement.Commit();
            return Ok(liteMeetingManagement);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LiteMeetingManagement liteMeetingManagement)
        {
            Uow.LiteMeetingManagement.RegisterDirty<LiteMeetingManagement>(liteMeetingManagement);
            Uow.LiteMeetingManagement.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var liteMeetingManagement = Uow.LiteMeetingManagement.Repository<LiteMeetingManagement>().FindByKey(id);
            Uow.LiteMeetingManagement.RegisterDeleted<LiteMeetingManagement>(liteMeetingManagement);
            Uow.LiteMeetingManagement.Commit();
            return NoContent();
        }
    }
}