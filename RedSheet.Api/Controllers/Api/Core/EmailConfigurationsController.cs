using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.UnitOfWork;
using RedSheet.ViewModels.Models;
using Rx.Core.Cache;
using Rx.Core.Data;
using Rx.Core.Settings;
using System.Data.SqlClient;
using System.Linq;
using RedSheet.DbEntities.Models;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class EmailConfigurationsController : Controller
    {
        private IMasterUow MasterUow { get; set; }
        public EmailConfigurationsController(IMasterUow masterUow)
        {
            MasterUow = masterUow;
        }
       
        public IActionResult Get()
        {
            var result = MasterUow.Repository<EmailConfiguration>().All();
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Put([FromBody]EmailConfiguration emailConfiguration)
        {
            MasterUow.RegisterDirty<EmailConfiguration>(emailConfiguration);
            MasterUow.Commit();
            return Ok(emailConfiguration);
        }
        
    }
}
