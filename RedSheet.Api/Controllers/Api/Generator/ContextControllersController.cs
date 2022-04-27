using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.GeneratorDbModels;
using RedSheet.UnitOfWork;

namespace RedSheet.Api.Controllers.Api
{

    [Route("api/[controller]")]
    public class ContextControllersController : Controller
    {
        private IGeneratorUow GeneratorUow { get; set; }

        private IMasterUow MasterUow { get; set; }

        public ContextControllersController(IGeneratorUow generatorUow, IMasterUow masterUow)
        {
            GeneratorUow = generatorUow;
            MasterUow = masterUow;
        }


        [HttpPut]
        public IActionResult Put([FromBody]GeneratorController controller) {
            GeneratorUow.RegisterDirty<GeneratorController>(controller);
            GeneratorUow.Commit();
            return Ok();
        }
       
    }
}
