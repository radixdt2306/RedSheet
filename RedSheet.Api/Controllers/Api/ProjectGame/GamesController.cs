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
	[Route("api/projectgamedetails/{projectGameDetailId}/[controller]")]
    public class GamesController : BaseController
    {
        public GamesController(IProjectGameUow projectGameUow, IApplicationUtility applicationUtility)
        {
            Uow.ProjectGame = projectGameUow;
			ApplicationUtility = applicationUtility;
        }

		[HttpGet]
		public IActionResult Get(int projectGameDetailId) => Ok(Uow.ProjectGame.Repository<Game>().FindBy(t=> t.ProjectGameDetailId == projectGameDetailId));


        [HttpGet("{id}")]
        public IActionResult   Get(int projectGameDetailId, int id)  => Ok(Uow.ProjectGame.Repository<vGameRecord>().SingleOrDefault(t => t.GameId == id));

        [HttpPost]
        public IActionResult Post([FromBody]Game game)
        {
            Uow.ProjectGame.RegisterNew<Game>(game);
            Uow.ProjectGame.Commit();
            return Ok(game);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Game game)
        {
            Uow.ProjectGame.RegisterDirty<Game>(game);
            Uow.ProjectGame.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var game = Uow.ProjectGame.Repository<Game>().FindByKey(id);
            Uow.ProjectGame.RegisterDeleted<Game>(game);
            Uow.ProjectGame.Commit();
            return NoContent();
        }
    }
}