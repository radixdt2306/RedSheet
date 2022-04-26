using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ExportReportUow : CoreUnitOfWork, IExportReportUow
    {
        public ExportReportUow(IExportReportContext exportReportContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(exportReportContext, repositoryProvider);
        }
    }

    public interface IExportReportUow : ICoreUnitOfWork
    {
    }
}
