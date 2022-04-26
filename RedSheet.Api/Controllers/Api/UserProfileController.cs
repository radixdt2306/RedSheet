using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using RedSheet.DbEntities.Models;
using RedSheet.Domain.Users;
using RedSheet.Infrastructure.Security;
using RedSheet.UnitOfWork;
using RedSheet.Api;
using Rx.Core.Cache;
using Rx.Core.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rx.Core.Security;
using System.Security.Claims;
using RedSheet.Domain.ClientServiceModule;
using RedSheet.Domain.MemberShipService;

namespace RedSheet.Api.Controllers
{

    [Route("api/[controller]")]
    public class UserProfileController : Controller
    {
        private IUserUow UserUow { get; set; }

        private IUserDomain UserDomain { get; set; }
        public ClientServiceContext ClientServiceContext { get; }

        public UserProfileController(IUserUow userUow,IUserDomain userDomain, ClientServiceContext clientServiceContext)
        {
            UserUow = userUow;
            UserDomain = userDomain;
            this.ClientServiceContext = clientServiceContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            UserProfileModel userProfileModel = new UserProfileModel();
            userProfileModel = this.ClientServiceContext.GetUserProfile(UserClaim.Email);
            return Ok(userProfileModel);
        }
       
       
    }
}
