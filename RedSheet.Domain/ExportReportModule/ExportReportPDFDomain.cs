using System.Collections.Generic;
using RedSheet.UnitOfWork;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Infrastructure.Utilities;
using RedSheet.DbEntities.Enums;
using WebSupergoo.ABCpdf11;
using System;
using Rx.Core.Settings;
using System.IO;

namespace RedSheet.Domain.ExportReportModule
{
    public class ExportReportPDFDomain : IExportReportPDFDomain
    {
        public ExportReportPDFDomain(IExportReportUow exportReportUow, IApplicationUtility applicationUtility, ServerSetting serverSetting)
        {
            ExportReportUow = exportReportUow;
            ApplicationUtility = applicationUtility;
            ValidationMessages = new HashSet<string>();
            ServerSetting = serverSetting;
        }

        public IEnumerable<ExportReportPDF> Get() => ExportReportUow.Repository<ExportReportPDF>().All();

        public ExportReportPDF Get(int id) => ExportReportUow.Repository<ExportReportPDF>().SingleOrDefault(t => t.ExportReportId == id);

        public HashSet<string> AddValidation(ExportReportPDF exportReportPDF)
        {
            CommonValidation(exportReportPDF);
            return ValidationMessages;
        }

        public ExportReportPDF Add(ExportReportPDF exportReportPDF)
        {
            ExportReportUow.RegisterNew<ExportReportPDF>(exportReportPDF);
            ExportReportUow.Commit();
            return exportReportPDF;
        }
        public HashSet<string> UpdateValidation(ExportReportPDF exportReportPDF)
        {
            CommonValidation(exportReportPDF);
            return ValidationMessages;
        }

        public ExportReportPDF Update(ExportReportPDF exportReportPDF)
        {
            ExportReportUow.RegisterDirty<ExportReportPDF>(exportReportPDF);
            ExportReportUow.Commit();
            return exportReportPDF;
        }
        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<ExportReportPDF>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var exportReportPDF = ExportReportUow.Repository<ExportReportPDF>().FindByKey(id);
            ExportReportUow.RegisterDeleted<ExportReportPDF>(exportReportPDF);
            ExportReportUow.Commit();
        }

        public byte[] ExportHtmlToPdf(int projectId, int templateTypeId)
        {
            //var currentURL = "http://redsheet-nfp.live1.dev.radixweb.net/AbcPdfFooterDemo.html";
            var currentURL = "";
            string currentYear = DateTime.Now.Year.ToString();
            var projectObject = ExportReportUow.Repository<Project>().SingleOrDefault(t => t.ProjectId == projectId);

            //RedSheet-Full     
            if (templateTypeId == 1)
            {
                currentURL = ServerSetting.Get<string>("applicationUrl.clientUrl") + "pdf" + "?projectId=" + projectId;
            }
            //RedSheet-Lite
            else if (templateTypeId == 2)
            {
                currentURL = ServerSetting.Get<string>("applicationUrl.clientUrl") + "redSheet-lite-report" + "?projectId=" + projectId;
            }
            //RedSheet-Nano
            else if (templateTypeId == 3)
            {
                currentURL = ServerSetting.Get<string>("applicationUrl.clientUrl") + "redSheet-nano-report" + "?projectId=" + projectId;
            }

            using (Doc doc = new Doc())
            {
                //doc.SetInfo(0, "License", "X/VKS0cMn5FgsCJaa6yCbY7/L7ZOQ4MYlq3wxL3FA0ojxkiVPH3rYMVWQ0lkwg8KCtU54j5PuSEdr6MhQbB4xFcjfGSdAnk6tGZLYdf9U03h1h3G5o9adrPFLGKub2slRr1yVsBU/kd9BSZ2piGZKQR9ey2dSHivx84+6lFwfuTUwaYkpDGt1GPWoLtEmj9WZntw331Em1a4fn0RALYRllhw4HDNY8wDAL3GN2/TEIjRciE4t7P3");
                doc.HtmlOptions.Engine = EngineType.Chrome;
                doc.MediaBox.String = "A4";
                doc.Page = doc.AddPage();
                doc.Rect.String = doc.MediaBox.String;

                // Set HTML options
                doc.HtmlOptions.RepaintDelay = 2500;
                doc.HtmlOptions.RepaintTimeout = 12500;
                doc.HtmlOptions.Timeout = 15500; // default (but should be set to > RepaintTimeout)
                doc.HtmlOptions.RetryCount = 0; // So we know if there's a problem as soon as possible
                                                // (From the Landscape Example in the docs)

                // apply a rotation transform
                double w = doc.MediaBox.Width;
                double h = doc.MediaBox.Height;
                double l = doc.MediaBox.Left;
                double b = doc.MediaBox.Bottom;
                doc.Transform.Rotate(90, l, b);
                doc.Transform.Translate(w, 0);

                // rotate our rectangle
                doc.Rect.Width = h;
                doc.Rect.Height = w;

                doc.Rect.Inset(30, 30);
                // Set HTML options
                doc.HtmlOptions.Media = MediaType.Print; // Chrome default
                doc.HtmlOptions.BrowserWidth = 842 * 96 / 72;

                // Convert all HTML
                int theID = doc.AddImageUrl(currentURL);
                XRect rc = new XRect("30 30 800 560");
                doc.Rect.SetRect(rc);
                doc.Color.String = "204 204 204";
                doc.FrameRect(22, 22);

                XImage theImg = new XImage();

                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/logo-pdf.png");
                theImg.SetFile(path);

                XColor borderColr = new XColor();
                borderColr.SetRgb(204, 204, 204);
                doc.Color.SetColor(borderColr);

                // Convert other HTML pages
                while (true)
                {
                    XRect rc1 = new XRect("30 30 800 560");
                    doc.Rect.SetRect(rc1);
                    doc.Color.String = "204 204 204";
                    doc.FrameRect(22, 22);
                    XRect rc2 = new XRect("32 58 796 550");
                    doc.Rect.SetRect(rc2);
                    doc.Color.String = "255 255 255";
                    doc.FrameRect(14, 14);

                    if (!doc.Chainable(theID)) break;
                    doc.Page = doc.AddPage();
                    theID = doc.AddImageToChain(theID);
                }
                //doc.Rect.Inset(40, 40);
                string theFont = "Verdana";
                doc.Font = doc.AddFont(theFont);
                borderColr.SetRgb(66, 85, 99);
                doc.Color.SetColor(borderColr);
                // Save
                for (int i = 1; i <= doc.PageCount; i++)
                {
                    doc.PageNumber = i;                     
                    doc.Color.String = "255 255 255";
                    doc.Rect.Width = 146;
                    doc.Rect.Height = 50;
                    doc.Rect.Position(625, 10);
                    doc.FrameRect();
                    doc.AddImageObject(theImg, true);
                    

                    
                    //doc.Rect.String = "624 10 615 55";
                    //doc.FillRect();
                    //doc.FrameRect();

                    //doc.Color.String = "255 255 255";
                    //doc.Rect.String = "624 10 615 55";
                    //doc.FillRect();
                    //doc.FrameRect();

                    doc.Rect.String = "37 10 350 20";
                    doc.Color.String = "66 85 99";
                    doc.AddTextStyled("© Positive Purchasing Ltd trading as Positive " + currentYear + " | All rights reserved");
                    doc.Flatten();
                }
                // adjust the default rotation
                theID = doc.GetInfoInt(doc.Root, "Pages");
                doc.SetInfo(theID, "/Rotate", "90");
                return doc.GetData();
            }
        }

        private void CommonValidation(ExportReportPDF exportReportPDF)
        {

        }

        private ServerSetting ServerSetting { get; set; }

        private IExportReportUow ExportReportUow { get; set; }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

    }
    public interface IExportReportPDFDomain
    {
        IEnumerable<ExportReportPDF> Get();
        ExportReportPDF Get(int id);
        HashSet<string> AddValidation(ExportReportPDF exportReportPDF);
        HashSet<string> UpdateValidation(ExportReportPDF exportReportPDF);
        HashSet<string> DeleteValidation(int id);
        ExportReportPDF Add(ExportReportPDF exportReportPDF);
        ExportReportPDF Update(ExportReportPDF exportReportPDF);
        byte[] ExportHtmlToPdf(int projectId, int templateTypeId);
        void Delete(int id);
    }
}
