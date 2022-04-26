using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectLookupUow : CoreUnitOfWork, IProjectLookupUow
    {
        public ProjectLookupUow(IProjectLookupContext projectLookupContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectLookupContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectLookupUow : ICoreUnitOfWork
    {
    }
}
