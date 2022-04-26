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
    public class ProjectCultureLookupsController : BaseController
    {
        public ProjectCultureLookupsController(IProjectCultureLookupUow projectCultureLookupUow)
        {
            Uow.ProjectCultureLookup = projectCultureLookupUow;
        }
        [HttpGet(ProjectCultureLookups.Countries)]
        public IQueryable<vCountry> GetCountries()
        {
            return Uow.ProjectCultureLookup.Repository<vCountry>().Queryable();
        }
        [HttpGet(ProjectCultureLookups.CultureCountries)]
        public IQueryable<vCultureCountry> GetCultureCountries()
        {
            return Uow.ProjectCultureLookup.Repository<vCultureCountry>().Queryable();
        }
    }
}
