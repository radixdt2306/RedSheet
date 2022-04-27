using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Rx.Core.Cache;
using RedSheet.Api.Constants;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using Microsoft.AspNetCore.Authorization;

namespace RedSheet.Api.Controllers
{

    [Route("api/[controller]")]
    //[AllowAnonymous]
    public class ProjectNegotiationLookupsController : BaseController
    {
        public ProjectNegotiationLookupsController(IProjectNegotiationLookupUow projectNegotiationLookupUow)
        {
            Uow.ProjectNegotiationLookup = projectNegotiationLookupUow;
        }
        [HttpGet(ProjectNegotiationLookups.Personalities)]
        public IQueryable<vPersonality> GetPersonalities()
        {
            return Uow.ProjectNegotiationLookup.Repository<vPersonality>().Queryable();
        }
    }
}
