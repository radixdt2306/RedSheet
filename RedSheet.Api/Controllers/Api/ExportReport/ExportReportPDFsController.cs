
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rx.Core.Data;
using RedSheet.UnitOfWork;	
using RedSheet.DbEntities.Models;
using RedSheet.Domain.ExportReportModule;
using RedSheet.BoundedContext;
using RedSheet.BoundedContext.SqlContext;
using System.Data.SqlClient;
using RedSheet.ViewModels.Models;
using RedSheet.Api.Constants;

namespace RedSheet.Api.Controllers.ExportReportControllers
{
    [Route("api/[controller]")]
    public class ExportReportPDFsController : BaseController
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public ExportReportPDFsController(IExportReportUow exportReportUow, IExportReportPDFDomain exportReportPDFDomain, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            Uow.ExportReport = exportReportUow;
            Domain.ExportReportPDF = exportReportPDFDomain;
            DbContextManager = dbContextManager;
        }

        
		[HttpGet]
		public IActionResult Get() => Ok(Domain.ExportReportPDF.Get());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(Domain.ExportReportPDF.Get(id));
        }

        [HttpGet("exportHtmlToPdf")]
        public IActionResult ExportHtmlToPdf(int projectId)
        {
            var project = Uow.ExportReport.Repository<Project>().FirstOrDefault(t=>t.ProjectId == projectId);
            int templateTypeId = 0;
            if (project.TemplateGroupId == RedSheetServiceConfiguration.RedhsheetProductId)
            {
                templateTypeId = 1;
            }
            else if (project.TemplateGroupId == RedSheetServiceConfiguration.RedsheetLiteProductId)
            {
                templateTypeId = 2;
            }
            else if (project.TemplateGroupId == RedSheetServiceConfiguration.RedsheetNanoProductId)
            {
                templateTypeId = 3;
            }
            return File(Domain.ExportReportPDF.ExportHtmlToPdf(projectId, templateTypeId), "application/pdf", project.ProjectName+".pdf");
        }

        [HttpGet("htmlToPdfData")]
        public IActionResult HtmlToPdfData(int projectId)
        {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter() { ParameterName = "ProjectId", Value = projectId };
            var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spRedSheetReport @ProjectId", spParameters).Result;
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

        [HttpGet("htmlToPdfLiteData")]
        public IActionResult HtmlToPdfLiteData(int projectId)
        {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter() { ParameterName = "ProjectId", Value = projectId };
            var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spRedSheetLiteReport @ProjectId", spParameters).Result;
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

        [HttpGet("nanoHtmlToPdfData")]
        public IActionResult NanoHtmlToPdfData(int projectId)
        {
            var spParameters = new object[1];
            spParameters[0] = new SqlParameter() { ParameterName = "ProjectId", Value = projectId };
            var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spRedSheetNanoReport @ProjectId", spParameters).Result;
            return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
        }

        [HttpPost]
        public IActionResult Post([FromBody]ExportReportPDF exportReportPDF)
        {
          
            var validations = Domain.ExportReportPDF.AddValidation(exportReportPDF);
            if (validations.Count() == 0) {
                var result = Domain.ExportReportPDF.Add(exportReportPDF);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ExportReportPDF exportReportPDF)
        {
            var validations = Domain.ExportReportPDF.UpdateValidation(exportReportPDF);
            if (validations.Count() == 0) {
                var result = Domain.ExportReportPDF.Update(exportReportPDF);
                return Ok(result);
            }
            return BadRequest(validations);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var validations = Domain.ExportReportPDF.DeleteValidation(id);
            if (validations.Count() == 0) {
                Domain.ExportReportPDF.Delete(id);
                return Ok(id);
            }
            return BadRequest(validations);
        }
    }
}
