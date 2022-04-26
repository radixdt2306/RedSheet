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
    public class ProjectPowerLookupsController : BaseController
    {
        public ProjectPowerLookupsController(IProjectPowerLookupUow projectPowerLookupUow)
        {
            Uow.ProjectPowerLookup = projectPowerLookupUow;
        }
        [HttpGet(ProjectPowerLookups.PowerTypes)]
        public IQueryable<vPowerType> GetPowerTypes()
        {
            return Uow.ProjectPowerLookup.Repository<vPowerType>().Queryable();
        }
    }
}
