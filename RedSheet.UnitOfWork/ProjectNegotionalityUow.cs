using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectNegotionalityUow : CoreUnitOfWork, IProjectNegotionalityUow
    {
        public ProjectNegotionalityUow(IProjectNegotionalityContext projectNegotionalityContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectNegotionalityContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectNegotionalityUow : ICoreUnitOfWork
    {
    }
}
