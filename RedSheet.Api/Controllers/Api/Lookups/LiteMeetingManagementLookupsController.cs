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
    public class LiteMeetingManagementLookupsController : BaseController
    {
        public LiteMeetingManagementLookupsController(ILiteMeetingManagementLookupUow liteMeetingManagementLookupUow)
        {
            Uow.LiteMeetingManagementLookup = liteMeetingManagementLookupUow;
        }
        [HttpGet(LiteMeetingManagementLookups.Tactics)]
        public IQueryable<vTactic> GetTactics()
        {
            return Uow.LiteMeetingManagementLookup.Repository<vTactic>().Queryable();
        }
    }
}
