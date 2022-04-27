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
    public class ProjectEventTimelineLookupsController : BaseController
    {
        public ProjectEventTimelineLookupsController(IProjectEventTimelineLookupUow projectEventTimelineLookupUow)
        {
            Uow.ProjectEventTimelineLookup = projectEventTimelineLookupUow;
        }
        [HttpGet(ProjectEventTimelineLookups.Tactics)]
        public IQueryable<Tactic> GetTactics()
        {
            return Uow.ProjectEventTimelineLookup.Repository<Tactic>().Queryable();
        }
    }
}
