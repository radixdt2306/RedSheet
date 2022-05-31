
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ProjectModule;
using RedSheet.BoundedContext;
using RedSheet.Api.Constants;
using RedSheet.ViewModels.Models;
using System.Data.SqlClient;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Constants;
using RedSheet.Models.ViewModels;
using RedSheet.DbEntities.ViewModels;
using Newtonsoft.Json.Linq;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProjectsController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public ProjectsController(IProjectUow projectUow, IProjectDomain projectDomain, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            Uow.Project = projectUow;
            Domain.Project = projectDomain;
            DbContextManager = dbContextManager;
        }

        [HttpGet]
        public IActionResult Get() => Ok(Uow.Project.Repository<Project>().All());

        //[HttpGet("{id}")]
        //public IActionResult Get(int id) => Ok(Uow.Project.Repository<vProjectRecord>().SingleOrDefault(t => t.ProjectId == id));

        [HttpGet("ProjectsFromSuperUserCompany/{id}")]
        public async Task<IActionResult> ProjectFromSuperUserCompany(int id)
        {
            var sqlParams = new object[1];
            sqlParams[0] = new SqlParameter() { ParameterName = "userId", Value = id };
            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spProjectsFromSuperUserCompany @userId", sqlParams);
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

        [HttpPost]
        [Route("SuperUser/search")]
        public async Task<IActionResult> ProjectsFilter([FromBody] StoreProcSearchModel storeProcSearch)
        {
            var query = JObject.Parse(storeProcSearch.Query);

            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "search", Value = query["search"].ToString() };
            spParameters[1] = new SqlParameter() { ParameterName = "filter", Value = query["filter"].ToString() };

            var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("exec spProjectsSuperUser @search , @filter", spParameters);

            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

        [HttpGet("{id}")]

        public IActionResult Get(int id)
        {
            Project projectData = new Project();
            Uow.Project.Repository<Project>().FindBy(a => a.ProjectId == id).ToList().ForEach(p =>
            {
                Uow.Project.Repository<ProjectModule>().FindBy(pm => pm.ProjectId == p.ProjectId).ToList().ForEach(
                    pmodule =>
                    {
                        Uow.Project.Repository<ProjectModuleAssignee>().FindBy(pma => pma.ProjectModuleId == pmodule.ProjectModuleId).ToList().ForEach(pma => pmodule.ProjectModuleAssignees.Add(pma));
                        Uow.Project.Repository<ProjectModuleReviewer>().FindBy(pmr => pmr.ProjectModuleId == pmodule.ProjectModuleId).ToList().ForEach(pmr => pmodule.ProjectModuleReviewers.Add(pmr));
                        p.ProjectModules.Add(pmodule);
                    }
                );

                Uow.Project.Repository<ProjectModuleAssigneesOrReviewer>().FindBy(pmaORr => pmaORr.ProjectId == p.ProjectId).ToList();

                projectData = p;
            });
            return Ok(projectData);
        }


        [HttpPost]
        public IActionResult Post([FromBody] Project project)
        {
            int templateTypeId = 0;
            if (project.TemplateGroupId == RedSheetServiceConfiguration.RedhsheetProductId)
            {
                templateTypeId = 1;
            }
            else if (project.TemplateGroupId == RedSheetServiceConfiguration.RedsheetLiteProductId)
            {
                templateTypeId = 2;
            }
            else if (project.TemplateGroupId == RedSheetServiceConfiguration.RedsheetNanoProductId)
            {
                templateTypeId = 3;
            }
            //var validations = Domain.Project.AddValidation(project);
            //if (validations.Count() == 0)
            //{
            var result = Domain.Project.Add(project, templateTypeId);
            return Ok(result);
            //}
            //return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Project project)
        {
            int templateTypeId = 0;
            if (project.TemplateGroupId == RedSheetServiceConfiguration.RedhsheetProductId)
            {
                templateTypeId = 1;
            }
            else if (project.TemplateGroupId == RedSheetServiceConfiguration.RedsheetLiteProductId)
            {
                templateTypeId = 2;
            }
            else if (project.TemplateGroupId == RedSheetServiceConfiguration.RedsheetNanoProductId)
            {
                templateTypeId = 3;
            }
            //var validations = Domain.Project.UpdateValidation(project);
            //if (validations.Count() == 0)
            //{
            var result = Domain.Project.Update(project, templateTypeId);
            return Ok(result);
            //}
            //return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //var validations = Domain.Project.DeleteValidation(id);
            //if (validations.Count() == 0)
            //{
            Domain.Project.Delete(id);
            return Ok(id);
            //}
            //return BadRequest(validations);
        }

        [HttpPost(ApplicationConstants.CREATE_COPY)]
        public int Post([FromBody] int projectId)
        {
            return Domain.Project.CreateCopy(projectId);
        }

        [HttpPost(ApplicationConstants.CLOSE_PROJECT)]
        public int CloseProject([FromBody] int projectId)
        {
            return Domain.Project.CloseProject(projectId);
        }

        [HttpPost(ApplicationConstants.COLLABARATORS_OR_REVIEWERS_IN_ALL_MODULES)]
        public int Post([FromBody] CollabaratorsOrReviewersInAllModules collabaratorsOrReviewersInAllModules)
        {
            // return Domain.Project.CreateCopy(projectId);
            return Domain.Project.CollabaratorsOrReviewersInAllModules(collabaratorsOrReviewersInAllModules);
        }
    }
}
