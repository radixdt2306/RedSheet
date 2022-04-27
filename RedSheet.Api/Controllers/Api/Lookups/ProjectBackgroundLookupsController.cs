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
    public class ProjectBackgroundLookupsController : BaseController
    {
        public ProjectBackgroundLookupsController(IProjectBackgroundLookupUow projectBackgroundLookupUow)
        {
            Uow.ProjectBackgroundLookup = projectBackgroundLookupUow;
        }
        [HttpGet(ProjectBackgroundLookups.NegotiationTypes)]
        public IQueryable<vNegotiationType> GetNegotiationTypes()
        {
            return Uow.ProjectBackgroundLookup.Repository<vNegotiationType>().Queryable();
        }
        [HttpGet(ProjectBackgroundLookups.ValueObjectives)]
        public IQueryable<vValueObjective> GetValueObjectives()
        {
            return Uow.ProjectBackgroundLookup.Repository<vValueObjective>().Queryable();
        }
        [HttpGet(ProjectBackgroundLookups.RelationshipRequires)]
        public IQueryable<vRelationshipRequire> GetRelationshipRequires()
        {
            return Uow.ProjectBackgroundLookup.Repository<vRelationshipRequire>().Queryable();
        }
    }
}
