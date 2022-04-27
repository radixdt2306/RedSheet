using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.Models.ViewModels;
using RedSheet.UnitOfWork;
using Rx.Core.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Domain.Roles;
using System;
using Rx.Core.Security;
using System.Security.Claims;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : BaseController
    {
        private IRoleDomain RoleDomain { get; set; }
        private IMasterUow MasterUow { get; set; }
        public RolesController(IRoleDomain roleDomain,IMasterUow masterUow)
        {
            RoleDomain = roleDomain;
            MasterUow = masterUow;

        }

        public async Task<IActionResult> Get()
        {
            //return Ok(await MasterUow.Repository<vRole>().FindByAsync(a=>a.RoleId != Convert.ToInt32(UserClaim.Get(ClaimTypes.Role))));
            return Ok(await MasterUow.Repository<vRole>().AllAsync());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(MasterUow.Repository<Role>().Single(t => t.RoleId == id));
        }
        [HttpPost]
        public IActionResult Post([FromBody]Role role) {
            var validations = RoleDomain.AddValidation(role);
            if (validations.Count == 0)
            {
                var result = RoleDomain.Add(role);
                return Ok(result);
            }
            return BadRequest(validations);

        }
        [HttpPut]
        public IActionResult Put([FromBody]Role role) {
            var validations = RoleDomain.UpdateValidation(role);
            if (validations.Count == 0)
            {
                var result = RoleDomain.Update(role);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            //var validations = RoleDomain.DeleteValidation(id);
            //if (validations.Count == 0)
            //{
                RoleDomain.Delete(id);
                return Ok(id);
            //}
            //return BadRequest(validations);
        }
    }
}
