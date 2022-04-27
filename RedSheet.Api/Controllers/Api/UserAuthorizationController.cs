using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Security;
using System.Security.Claims;
using RedSheet.ViewModels.Models;
using RedSheet.Infrastructure.Authorization;
using Rx.Core.Security.Jwt;
using RedSheet.Domain.MemberShipService;
using RedSheet.Domain.ClientServiceModule;
using System.ServiceModel;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserAuthorizationController : BaseController
    {
        private IUserAuthorization UserAuthorization { get; set; }
        private ITokenProvider TokenProvider { get; set; }
        public UserAuthorizationController(IUserAuthorization userAuthorization, ITokenProvider tokenProvider)
        {
            TokenProvider = tokenProvider;
            UserAuthorization = userAuthorization;
        }

        [HttpPost("authorize")]
        public IActionResult Post([FromBody] UserAuthorizationViewModel userAuthorizationViewModel, string uid = "", string ssoKey = "", string trg = "")
        {         

            if (!userAuthorizationViewModel.IsApplicationAuthorized)
                userAuthorizationViewModel.ApplicationModuleId = 0;
            var result = UserAuthorization.GetAccessModules(userAuthorizationViewModel.ApplicationModuleId, Convert.ToInt32(UserClaim.Get(ClaimTypes.Role)));

            //if (!string.IsNullOrEmpty(uid) && !string.IsNullOrEmpty(ssoKey) && !string.IsNullOrEmpty(trg))
            //{
            //    var basicBinding = new BasicHttpBinding();
            //    basicBinding.MaxReceivedMessageSize = Int32.MaxValue;
            //    basicBinding.MaxBufferSize = Int32.MaxValue;
            //    var endPointAddress = new EndpointAddress("http://localhost:9876/MembershipService");
            //    var clientServiceContext = new ClientServiceContext(basicBinding, endPointAddress);
            //    ClientServiceContext context = new ClientServiceContext(basicBinding, endPointAddress);

            //    SSOAuthenticationResult ssoAuthenticationResult = context.AuthenticateSSORequest(uid, trg, ssoKey);

            //    if (ssoAuthenticationResult.IsAuthenticated)
            //    {
            //        result.Add("AcademyUrl", ssoAuthenticationResult.RequestApplicationReturnUrl);
            //    }
            //}

            return Ok(result);
        }
        [HttpPost("logout")]
        public IActionResult PostLogOut()
        {
            TokenProvider.LogOut();
            return NoContent();
        }
    }
}
