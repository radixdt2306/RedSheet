using Microsoft.AspNetCore.Mvc;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using System.Threading.Tasks;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class EmailTemplateDetailController : Controller
    {
        private IMasterUow MasterUow { get; set; }
        public EmailTemplateDetailController(IMasterUow masterUow)
        {
            MasterUow = masterUow;
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var emailTemplateDetail = this.MasterUow.Repository<EmailTemplateDetail>().FindByKey(id);
            this.MasterUow.RegisterDeleted<EmailTemplateDetail>(emailTemplateDetail);
            this.MasterUow.Commit();
            return Ok(id);
        }
    }
}
