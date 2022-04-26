using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Filters;

namespace RedSheet.Api.Controllers
{
	[TypeFilter(typeof(ProjectUpdate))]
	[Route("api/projectcultures/{projectCultureId}/[controller]")]
    public class CulturesController : BaseController
    {
        public CulturesController(IProjectCultureUow projectCultureUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectCulture = projectCultureUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectCultureId) => Ok(Uow.ProjectCulture.Repository<Culture>().FindBy(t=> t.ProjectCultureId == projectCultureId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectCultureId, int id)  => Ok(Uow.ProjectCulture.Repository<Culture>().SingleOrDefault(t => t.CultureId == id));

        [HttpPost]
        public IActionResult Post([FromBody]Culture culture)
        {
            Uow.ProjectCulture.RegisterNew<Culture>(culture);
            Uow.ProjectCulture.Commit();
            return Ok(culture);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Culture culture)
        {
            Uow.ProjectCulture.RegisterDirty<Culture>(culture);
            Uow.ProjectCulture.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var culture = Uow.ProjectCulture.Repository<Culture>().FindByKey(id);
            Uow.ProjectCulture.RegisterDeleted<Culture>(culture);
            Uow.ProjectCulture.Commit();
            return NoContent();
        }
    }
}