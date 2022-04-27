using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.GeneratorDbModels;
using RedSheet.UnitOfWork;

namespace RedSheet.Api.Controllers.Api
{

    [Route("api/[controller]")]
    public class GeneratorModelsController : Controller
    {
        private IGeneratorUow GeneratorUow { get; set; }

        private IMasterUow MasterUow { get; set; }

        public GeneratorModelsController(IGeneratorUow generatorUow, IMasterUow masterUow)
        {
            GeneratorUow = generatorUow;
            MasterUow = masterUow;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok(GeneratorUow.Repository<GeneratorModel>().All());
        }

        [HttpPut]
        public IActionResult Put([FromBody]GeneratorModel generatorModel) {
            GeneratorUow.RegisterDirty<GeneratorModel>(generatorModel);
            GeneratorUow.Commit();
            return Ok();
        }
       
    }
}
