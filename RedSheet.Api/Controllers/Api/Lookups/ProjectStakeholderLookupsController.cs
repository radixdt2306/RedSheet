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
    public class ProjectStakeholderLookupsController : BaseController
    {
        public ProjectStakeholderLookupsController(IProjectStakeholderLookupUow projectStakeholderLookupUow)
        {
            Uow.ProjectStakeholderLookup = projectStakeholderLookupUow;
        }
        [HttpGet(ProjectStakeholderLookups.CommunicationModes)]
        public IQueryable<vCommunicationMode> GetCommunicationModes()
        {
            return Uow.ProjectStakeholderLookup.Repository<vCommunicationMode>().Queryable();
        }
        [HttpGet(ProjectStakeholderLookups.StakeholderTypes)]
        public IQueryable<vStakeholderType> GetStakeholderTypes()
        {
            return Uow.ProjectStakeholderLookup.Repository<vStakeholderType>().Queryable();
        }
    }
}
