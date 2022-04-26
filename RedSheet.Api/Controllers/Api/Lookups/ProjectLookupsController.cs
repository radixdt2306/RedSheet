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
    public class ProjectLookupsController : BaseController
    {
        public ProjectLookupsController(IProjectLookupUow projectLookupUow, IProjectUow projectUOW)
        {
            Uow.ProjectLookup = projectLookupUow;
            _projectUOW = projectUOW;
        }

        [HttpGet(ProjectLookups.TemplateGroups)]
        public IQueryable<vTemplateGroup> GetTemplateGroups()
        {
            return Uow.ProjectLookup.Repository<vTemplateGroup>().Queryable();
        }

        [HttpGet(ProjectLookups.ProjectModuleAssigneesOrReviewerGroups)]
        public IQueryable<ProjectModuleAssigneesOrReviewer> GetProjectModuleAssigneesOrReviewerGroups()
        {
            return _projectUOW.Repository<ProjectModuleAssigneesOrReviewer>().Queryable();
        }

        private IProjectUow _projectUOW { get; set; }
    }
}
