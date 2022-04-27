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
    public class GlobalSettingsController : Controller
    {
        private IMasterUow MasterUow { get; set; }
        public GlobalSettingsController(IMasterUow masterUow)
        {
            MasterUow = masterUow;
        }

        public IActionResult Get() {
            var result = MasterUow.Repository<GlobalSetting>().All();
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Put([FromBody]GlobalSetting globalSetting)
        {
            MasterUow.RegisterDirty<GlobalSetting>(globalSetting);
            MasterUow.Commit();
            return Ok(globalSetting);
        }
    }
}
