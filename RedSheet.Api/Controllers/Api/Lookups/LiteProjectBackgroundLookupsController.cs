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
    public class LiteProjectBackgroundLookupsController : BaseController
    {
        public LiteProjectBackgroundLookupsController(ILiteProjectBackgroundLookupUow liteProjectBackgroundLookupUow)
        {
            Uow.LiteProjectBackgroundLookup = liteProjectBackgroundLookupUow;
        }
        [HttpGet(LiteProjectBackgroundLookups.CommunicationModes)]
        public IQueryable<vCommunicationMode> GetCommunicationModes()
        {
            return Uow.LiteProjectBackgroundLookup.Repository<vCommunicationMode>().Queryable();
        }
        [HttpGet(LiteProjectBackgroundLookups.Personalities)]
        public IQueryable<vPersonality> GetPersonalities()
        {
            return Uow.LiteProjectBackgroundLookup.Repository<vPersonality>().Queryable();
        }
        [HttpGet(LiteProjectBackgroundLookups.UserLookups)]
        public IQueryable<vUserLookup> GetUserLookups()
        {
            return Uow.LiteProjectBackgroundLookup.Repository<vUserLookup>().Queryable();
        }
        [HttpGet(LiteProjectBackgroundLookups.ValueObjectives)]
        public IQueryable<vValueObjective> GetValueObjectives()
        {
            return Uow.LiteProjectBackgroundLookup.Repository<vValueObjective>().Queryable();
        }
        [HttpGet(LiteProjectBackgroundLookups.LiteRelationshipRequires)]
        public IQueryable<vLiteRelationshipRequire> GetLiteRelationshipRequires()
        {
            return Uow.LiteProjectBackgroundLookup.Repository<vLiteRelationshipRequire>().Queryable();
        }
    }
}
