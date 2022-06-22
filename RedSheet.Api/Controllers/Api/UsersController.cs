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
using RedSheet.Domain.MemberShipService;
using Rx.Core.Security;
using RedSheet.Domain.ClientServiceModule;
using System.Data.SqlClient;
using Rx.Core.Data;
using RedSheet.ViewModels.Models;
using RedSheet.BoundedContext.SqlContext;

namespace RedSheet.Api.Controllers
{

    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserUow UserUow { get; set; }

        private IUserDomain UserDomain { get; set; }

        public ClientServiceContext ClientServiceContext { get; }

        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public UsersController(IUserUow userUow,IUserDomain userDomain, ClientServiceContext clientServiceContext, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            UserUow = userUow;
            UserDomain = userDomain;
            this.ClientServiceContext = clientServiceContext;
            DbContextManager = dbContextManager;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string companyId = UserUow.Repository<User>().SingleOrDefault(a => a.UserId == UserClaim.UserId).CompanyId.ToString();
            return Ok(UserUow.Repository<User>().All().Where(a => a.CompanyId.ToString().ToLower() == companyId.ToLower()));
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(UserUow.Repository<vUserRecord>().Single(a=>a.UserId == id));
        }
        [HttpGet]
        [Route("GetProjectUsers/{projectId}")]
        public async Task<IActionResult> ProjectUsers(int projectId)
        {
            var spParameters = new object[1];

            spParameters[0] = new SqlParameter() { ParameterName = "projectId", Value = projectId };

            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spProjectUsers @projectId", spParameters);
            var response = storeProcSearchResult.SingleOrDefault()?.Result;

            if (response != null)
            {
                return Ok(response);
            }
            else
            {
                return Ok("false");
            }

        }
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {

            var validations = UserDomain.AddValidation(user);
            if (validations.Count == 0)
            {
                var result = UserDomain.Add(user);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpPut]
        public IActionResult Put([FromBody]UserProfileModel user)
        {
            var userObject = UserUow.Repository<User>().SingleOrDefault(t => t.UserId == UserClaim.UserId);
            userObject.FirstName = user.Forename;
            userObject.LastName = user.Surname;
            userObject.Email = user.Email;
            userObject.Office = user.Position;
            userObject.CompanyName = user.CompanyName;
            var validations = UserDomain.UpdateValidation(userObject);
            if (validations.Count == 0)
            {
                var result = UserDomain.Update(userObject);
               var updateUserData = this.ClientServiceContext.ClientApplication_UpdateUserProfile(user);
                if(updateUserData.ContainsKey(1))
                {
                    return Ok(result);
                }
                else if(updateUserData.ContainsKey(-1))
                {
                    return BadRequest(result);
                }
            }
            return BadRequest(validations);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = UserDomain.DeleteValidation(id);
            if (validations.Count == 0)
            {
                UserDomain.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
