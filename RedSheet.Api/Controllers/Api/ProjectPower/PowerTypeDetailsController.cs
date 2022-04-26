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
	[Route("api/projectpowers/{projectPowerId}/[controller]")]
    public class PowerTypeDetailsController : BaseController
    {
        public PowerTypeDetailsController(IProjectPowerUow projectPowerUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectPower = projectPowerUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectPowerId) => Ok(Uow.ProjectPower.Repository<vPowerTypeDetail>().FindBy(t=> t.ProjectPowerId == projectPowerId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectPowerId, int id)  => Ok(Uow.ProjectPower.Repository<vPowerTypeDetailRecord>().SingleOrDefault(t => t.PowerTypeDetailId == id));

        [HttpPost]
        public IActionResult Post([FromBody]PowerTypeDetail powerTypeDetail)
        {
            Uow.ProjectPower.RegisterNew<PowerTypeDetail>(powerTypeDetail);
            Uow.ProjectPower.Commit();
            return Ok(powerTypeDetail);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]PowerTypeDetail powerTypeDetail)
        {
            Uow.ProjectPower.RegisterDirty<PowerTypeDetail>(powerTypeDetail);
            Uow.ProjectPower.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var powerTypeDetail = Uow.ProjectPower.Repository<PowerTypeDetail>().FindByKey(id);
            Uow.ProjectPower.RegisterDeleted<PowerTypeDetail>(powerTypeDetail);
            Uow.ProjectPower.Commit();
            return NoContent();
        }
    }
}