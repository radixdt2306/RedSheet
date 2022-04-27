using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectUow : CoreUnitOfWork, IProjectUow
    {
        public ProjectUow(IProjectContext projectContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectUow : ICoreUnitOfWork
    {
    }
}
