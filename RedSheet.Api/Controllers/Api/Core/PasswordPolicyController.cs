using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.Models.ViewModels;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Linq;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class PasswordPolicyController : Controller
    {
        private IMasterUow MasterUow { get; set; }
        public PasswordPolicyController(IMasterUow masterUow)
        {
            MasterUow = masterUow;
        }

        public IActionResult Get() {
            var result = MasterUow.Repository<PasswordPolicy>().All();
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Put([FromBody]PasswordPolicy passwordPolicy)
        {
            MasterUow.RegisterDirty<PasswordPolicy>(passwordPolicy);
            MasterUow.Commit();
            return Ok(passwordPolicy);
        }
    }
}
