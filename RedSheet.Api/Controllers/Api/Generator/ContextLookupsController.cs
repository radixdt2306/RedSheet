using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.GeneratorDbModels;
using RedSheet.UnitOfWork;

namespace RedSheet.Api.Controllers.Api
{

    [Route("api/[controller]")]
    public class ContextLookupsController : Controller
    {
        private IGeneratorUow GeneratorUow { get; set; }

        private IMasterUow MasterUow { get; set; }

        public ContextLookupsController(IGeneratorUow generatorUow, IMasterUow masterUow)
        {
            GeneratorUow = generatorUow;
            MasterUow = masterUow;
        }


        [HttpPost]
        public IActionResult Post([FromBody]GeneratorContextLookup generatorContextLookup) {
            GeneratorUow.RegisterNew<GeneratorContextLookup>(generatorContextLookup);
            GeneratorUow.Commit();
            return Ok(generatorContextLookup);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var findObject = GeneratorUow.Repository<GeneratorContextLookup>().SingleOrDefault(t=>t.GeneratorLookupId == id);
            GeneratorUow.RegisterDeleted<GeneratorContextLookup>(findObject);
            GeneratorUow.Commit();
            return Ok();
        }

    }
}
