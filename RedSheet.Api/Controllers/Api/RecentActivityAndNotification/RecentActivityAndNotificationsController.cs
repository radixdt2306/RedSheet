using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class RecentActivityAndNotificationsController : BaseController
    {
        public RecentActivityAndNotificationsController(IRecentActivityAndNotificationUow recentActivityAndNotificationUow, IApplicationUtility applicationUtility)
        {
            Uow.RecentActivityAndNotification = recentActivityAndNotificationUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get() => Ok(Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().All());


        [HttpGet("{id}")]
        public IActionResult  Get(int id)   => Ok(Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().SingleOrDefault(t => t.RecentActivityAndNotificationId == id));

        [HttpPost]
        public IActionResult Post([FromBody]RecentActivityAndNotification recentActivityAndNotification)
        {
			var validationMessages = new List<string>();
            var recentActivityAndNotificationObject = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().SingleOrDefault(t => t.RecentActivityAndNotificationName == recentActivityAndNotification.RecentActivityAndNotificationName);
            if (recentActivityAndNotificationObject != null) {
                validationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits,true));
				return BadRequest(validationMessages);
            }
            Uow.RecentActivityAndNotification.RegisterNew<RecentActivityAndNotification>(recentActivityAndNotification);
            Uow.RecentActivityAndNotification.Commit();
            return Ok(recentActivityAndNotification);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]RecentActivityAndNotification recentActivityAndNotification)
        {
			var validationMessages = new List<string>();
            var recentActivityAndNotificationObject = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().SingleOrDefault(t => t.RecentActivityAndNotificationName == recentActivityAndNotification.RecentActivityAndNotificationName  && t.RecentActivityAndNotificationId != recentActivityAndNotification.RecentActivityAndNotificationId);
            if (recentActivityAndNotificationObject != null) {
                validationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits,true));
				return BadRequest(validationMessages);
            }
            Uow.RecentActivityAndNotification.RegisterDirty<RecentActivityAndNotification>(recentActivityAndNotification);
            Uow.RecentActivityAndNotification.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var recentActivityAndNotification = Uow.RecentActivityAndNotification.Repository<RecentActivityAndNotification>().FindByKey(id);
            Uow.RecentActivityAndNotification.RegisterDeleted<RecentActivityAndNotification>(recentActivityAndNotification);
            Uow.RecentActivityAndNotification.Commit();
            return NoContent();
        }
    }
}