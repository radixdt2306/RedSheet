using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.GeneratorDbModels;
using RedSheet.UnitOfWork;

namespace RedSheet.Api.Controllers.Api
{

    [Route("api/[controller]")]
    public class ContextViewsController : Controller
    {
        private IGeneratorUow GeneratorUow { get; set; }

        private IMasterUow MasterUow { get; set; }

        public ContextViewsController(IGeneratorUow generatorUow, IMasterUow masterUow)
        {
            GeneratorUow = generatorUow;
            MasterUow = masterUow;
        }


        [HttpPost]
        public IActionResult Post([FromBody]GeneratorContextView generatorContextView) {
            GeneratorUow.RegisterNew<GeneratorContextView>(generatorContextView);
            GeneratorUow.Commit();
            return Ok(generatorContextView);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var findObject = GeneratorUow.Repository<GeneratorContextView>().FindByKey(id);
            GeneratorUow.RegisterDeleted<GeneratorContextView>(findObject);
            GeneratorUow.Commit();
            return Ok();
        }

    }
}
