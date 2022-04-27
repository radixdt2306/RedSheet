using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using Rx.Core.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using RedSheet.Domain.RolePermissions;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class RolePermissionsController : Controller
    {
        
        private IMasterUow MasterUow { get; set; }
        private IRolePermissionsDomain RolePermissionsDomain { get; set; }
        public RolePermissionsController(IMasterUow masterUow, IRolePermissionsDomain rolePermissionsDomain)
        {
            MasterUow = masterUow;
            RolePermissionsDomain = rolePermissionsDomain;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            return Ok(await MasterUow.Repository<RolePermission>().FindByAsync(t=>t.RoleId == id));
        }
        [HttpPost]
        public IActionResult Post([FromBody]RolePermission rolePermission) {
            var validations = RolePermissionsDomain.AddValidation(rolePermission);
            if (validations.Count == 0)
            {
                var result = RolePermissionsDomain.Add(rolePermission);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpPut]
        public IActionResult Put([FromBody]RolePermission rolePermission) {
            var validations = RolePermissionsDomain.UpdateValidation(rolePermission);
            if (validations.Count == 0)
            {
                var result = RolePermissionsDomain.Update(rolePermission);
                return Ok(result);
            }
            return BadRequest(validations);
        }
    }
}
