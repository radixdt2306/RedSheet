using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Rx.Core.Cache;
using RedSheet.Api.Constants;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace RedSheet.Api.Controllers
{

    [Route("api/[controller]")]
    //[AllowAnonymous]
    public class ProjectModuleLookupsController : BaseController
    {
        public ProjectModuleLookupsController(IProjectModuleLookupUow projectModuleLookupUow)
        {
            Uow.ProjectModuleLookup = projectModuleLookupUow;
        }   
        //[HttpGet(ProjectModuleLookups.ProjectModuleAssignees)]
        //public IQueryable<vProjectModuleAssignee> GetProjectModuleAssignees()
        //{
        //    return Uow.ProjectModuleLookup.Repository<vProjectModuleAssignee>().Queryable();
        //}
        //[HttpGet(ProjectModuleLookups.ProjectModuleReviewers)]
        //public IQueryable<vProjectModuleReviewer> GetProjectModuleReviewers()
        //{
        //    return Uow.ProjectModuleLookup.Repository<vProjectModuleReviewer>().Queryable();
        //}
        [HttpGet(ProjectModuleLookups.Tactics)]
        public IQueryable<vTactic> GetTactics()
        {
            return Uow.ProjectModuleLookup.Repository<vTactic>().Queryable();
        }
        //[HttpGet(ProjectModuleLookups.TemplateModules)]
        //public IQueryable<vTemplateModule> GetTemplateModules()
        //{
        //    return Uow.ProjectModuleLookup.Repository<vTemplateModule>().Queryable();
        //}
        [HttpGet(ProjectModuleLookups.TemplateModules)]
        public IEnumerable<vTemplateModule> GetTemplateModules()
        {
            return Uow.ProjectModuleLookup.Repository<vTemplateModule>().FindBy(a => a.ProjectId == 1018);
        }
        [HttpGet(ProjectModuleLookups.ProjectModuleReviewers)]
        public IEnumerable<vProjectModuleReviewer> GetProjectModuleReviewers()
        {
            return Uow.ProjectModuleLookup.Repository<vProjectModuleReviewer>().FindBy(a => a.ProjectModuleId == 81);
        }
        [HttpGet(ProjectModuleLookups.ProjectModuleAssignees)]
        public IEnumerable<vProjectModuleAssignee> GetProjectModuleAssignees()
        {
            return Uow.ProjectModuleLookup.Repository<vProjectModuleAssignee>().FindBy(a => a.ProjectModuleId == 1018);
        }
    }
}
