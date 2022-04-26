using Microsoft.AspNetCore.Mvc;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork;
using System.Threading.Tasks;
using RedSheet.Domain.EmailTemplates;
using System;
using Rx.Core.Data;
using System.Data.SqlClient;

namespace RedSheet.Api.Controllers
{
    [Route("api/[controller]")]
    public class EmailTemplateController : BaseController
    {
        private IEmailTemplateDomain EmailTemplateDomain { get; set; }
        private IMasterUow MasterUow { get; set; }
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public EmailTemplateController(IEmailTemplateDomain emailTemplateDomain, IMasterUow masterUow)
        {
            EmailTemplateDomain = emailTemplateDomain;
            MasterUow = masterUow;
        }

        public async Task<IActionResult> Get() {
             return Ok(await MasterUow.Repository<vEmailTemplate>().AllAsync());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = MasterUow.Repository<EmailTemplate>().FindByInclude(t => t.EmailTemplateId == id, a => a.EmailTemplateDetails);
            return Ok(result);
        }
        [HttpPost]

        public IActionResult Post([FromBody]EmailTemplate emailTemplate) {
            var validations = EmailTemplateDomain.AddValidation(emailTemplate);
            if (validations.Count == 0)
            {
                var result = EmailTemplateDomain.Add(emailTemplate);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpPut]
        public IActionResult Put([FromBody]EmailTemplate emailTemplate) {
            var validations = EmailTemplateDomain.UpdateValidation(emailTemplate);
            if (validations.Count == 0)
            {
                var result = EmailTemplateDomain.Update(emailTemplate);
                return Ok(result);
            }
            return BadRequest(validations);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var validations = EmailTemplateDomain.DeleteValidation(id);
            if (validations.Count == 0)
            {
                EmailTemplateDomain.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
