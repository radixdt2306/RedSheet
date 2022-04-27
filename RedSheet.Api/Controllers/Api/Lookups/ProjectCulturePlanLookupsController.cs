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
    public class ProjectCulturePlanLookupsController : BaseController
    {
        public ProjectCulturePlanLookupsController(IProjectCulturePlanLookupUow projectCulturePlanLookupUow)
        {
            Uow.ProjectCulturePlanLookup = projectCulturePlanLookupUow;
        }
        [HttpGet(ProjectCulturePlanLookups.CulturePlans)]
        public IQueryable<vCulturePlan> GetCulturePlans()
        {
            return Uow.ProjectCulturePlanLookup.Repository<vCulturePlan>().Queryable();
        }
    }
}
