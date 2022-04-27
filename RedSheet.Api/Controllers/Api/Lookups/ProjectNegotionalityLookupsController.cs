using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Rx.Core.Cache;
using RedSheet.Api.Constants;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using System.Collections.Generic;
using Rx.Core.Security;
using Microsoft.AspNetCore.Authorization;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    //[AllowAnonymous]
    public class ProjectNegotionalityLookupsController : BaseController
    {
        private IUserUow UserUow { get; set; }

        public ProjectNegotionalityLookupsController(IProjectNegotionalityLookupUow projectNegotionalityLookupUow, IUserUow userUow)
        {
            Uow.ProjectNegotionalityLookup = projectNegotionalityLookupUow;
            UserUow = userUow;
        }
        [HttpGet(ProjectNegotionalityLookups.TeamRoles)]
        public IEnumerable<vTeamRole> GetTeamRoles()
        {
            return Uow.ProjectNegotionalityLookup.Repository<vTeamRole>().All();
        }
        [HttpGet(ProjectNegotionalityLookups.UserLookups)]
        public IQueryable<vUserLookup> GetUserLookups()
        {
            string companyId = UserUow.Repository<User>().SingleOrDefault(a => a.UserId == UserClaim.UserId && a.StatusId == DbEntities.Enums.Status.Active).CompanyId.ToString();
            return Uow.ProjectNegotionalityLookup.Repository<vUserLookup>().Queryable().Where(a => a.CompanyId.ToString().ToLower() == companyId.ToLower());
        }
    }
}
