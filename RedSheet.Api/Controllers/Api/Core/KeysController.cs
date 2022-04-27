using Microsoft.AspNetCore.Mvc;
using RedSheet.UnitOfWork;
using Rx.Core.Cache;
using System.Collections.Generic;
using System.Linq;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class KeysController : BaseController
    {
        private IMasterUow MasterUow { get; set; }
        private IApplicationCache ApplicationCache { get; set; }
        public KeysController(IMasterUow masterUow,IApplicationCache applicationCache)
        {
            MasterUow = masterUow;
            ApplicationCache = applicationCache;
        }

        [HttpGet]
        public IActionResult Get() {
            var cachedKeys = this.ApplicationCache.GetGlobal<Dictionary<string, string>>("keys");
            if (cachedKeys == null)
                cachedKeys = MasterUow.Repository<CacheKey>().All().ToDictionary(x => x.CacheKeyName, y => y.KeyId);
            return Ok(cachedKeys);
        }
    }
}
