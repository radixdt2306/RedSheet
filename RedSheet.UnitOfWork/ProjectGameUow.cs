using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectGameUow : CoreUnitOfWork, IProjectGameUow
    {
        public ProjectGameUow(IProjectGameContext projectGameContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectGameContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectGameUow : ICoreUnitOfWork
    {
    }
}
