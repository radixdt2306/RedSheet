using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using System;
using System.Threading.Tasks;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationModulesController : Controller
    {
        private IMasterUow MasterUow { get; set; }
        public ApplicationModulesController(IMasterUow masterUow)
        {
            MasterUow = masterUow;
        }

        public async Task<IActionResult> Get() {
            
            return Ok(await MasterUow.Repository<vApplicationModule>().AllAsync());
        }
        [HttpPost]
        public IActionResult Post([FromBody]ApplicationModule applicationModule) {
            this.MasterUow.RegisterNew<ApplicationModule>(applicationModule);
            this.MasterUow.Commit();
            return Ok();
        }
        [HttpPut]
        public IActionResult Put([FromBody]ApplicationModule applicationModule) {
            this.MasterUow.RegisterDirty<ApplicationModule>(applicationModule);
            this.MasterUow.Commit();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var applicationModule = this.MasterUow.Repository<ApplicationModule>().FindByKey(id);
            this.MasterUow.RegisterDirty<ApplicationModule>(applicationModule);
            this.MasterUow.Commit();
            return Ok();
        }
    }
}
