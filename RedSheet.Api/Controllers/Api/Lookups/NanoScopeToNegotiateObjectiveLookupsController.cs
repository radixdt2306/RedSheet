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
    public class NanoScopeToNegotiateObjectiveLookupsController : BaseController
    {
        public NanoScopeToNegotiateObjectiveLookupsController(INanoScopeToNegotiateObjectiveLookupUow nanoScopeToNegotiateObjectiveLookupUow)
        {
            Uow.NanoScopeToNegotiateObjectiveLookup = nanoScopeToNegotiateObjectiveLookupUow;
        }
        [HttpGet(NanoScopeToNegotiateObjectiveLookups.CommunicationModes)]
        public IQueryable<vCommunicationMode> GetCommunicationModes()
        {
            return Uow.NanoScopeToNegotiateObjectiveLookup.Repository<vCommunicationMode>().Queryable();
        }
        [HttpGet(NanoScopeToNegotiateObjectiveLookups.NanoRelationshipRequires)]
        public IQueryable<vNanoRelationshipRequire> GetNanoRelationshipRequires()
        {
            return Uow.NanoScopeToNegotiateObjectiveLookup.Repository<vNanoRelationshipRequire>().Queryable();
        }
        [HttpGet(NanoScopeToNegotiateObjectiveLookups.NanoScopeToNegotiates)]
        public IQueryable<vNanoScopeToNegotiate> GetNanoScopeToNegotiates()
        {
            return Uow.NanoScopeToNegotiateObjectiveLookup.Repository<vNanoScopeToNegotiate>().Queryable();
        }
        [HttpGet(NanoScopeToNegotiateObjectiveLookups.ValueObjectives)]
        public IQueryable<vValueObjective> GetValueObjectives()
        {
            return Uow.NanoScopeToNegotiateObjectiveLookup.Repository<vValueObjective>().Queryable();
        }
    }
}
