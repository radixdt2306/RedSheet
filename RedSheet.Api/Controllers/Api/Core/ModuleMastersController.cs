using Microsoft.AspNetCore.Mvc;
using Rx.Core.Security;
using RedSheet.DbEntities.Models;
using RedSheet.Domain.Core.ModuleMasters;
using RedSheet.UnitOfWork;
using System;
using System.Threading.Tasks;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class ModuleMastersController : Controller
    {
        private IMasterUow MasterUow { get; set; }

        private IModuleMasterDomain ModuleMasterDomain { get; set; }
        public ModuleMastersController(IModuleMasterDomain moduleMasterDomain,IMasterUow masterUow)
        {
            MasterUow = masterUow;
            ModuleMasterDomain = moduleMasterDomain;
        }
         
        public async Task<IActionResult> Get() {
            var abc = UserClaim.UserId;
            try
            {
                var a = 5;
                var b = 0;
                var c = a / b;
            }
            catch (Exception e)
            {
                throw e;
            }
            return Ok(await MasterUow.Repository<ModuleMaster>().AllAsync());
        }
        [HttpPost]
        public IActionResult Post([FromBody]ModuleMaster moduleMaster) {
            var validations = ModuleMasterDomain.AddValidation(moduleMaster);
            if (validations.Count == 0)
            {
                var result = ModuleMasterDomain.Add(moduleMaster);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpPut]
        public IActionResult Put([FromBody]ModuleMaster moduleMaster) {
            var validations = ModuleMasterDomain.UpdateValidation(moduleMaster);
            if (validations.Count == 0)
            {
                var result = ModuleMasterDomain.Update(moduleMaster);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var validations = ModuleMasterDomain.DeleteValidation(id);
            if (validations.Count == 0)
            {
                ModuleMasterDomain.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
