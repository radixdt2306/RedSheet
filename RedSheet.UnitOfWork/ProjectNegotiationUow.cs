using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectNegotiationUow : CoreUnitOfWork, IProjectNegotiationUow
    {
        public ProjectNegotiationUow(IProjectNegotiationContext projectNegotiationContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectNegotiationContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectNegotiationUow : ICoreUnitOfWork
    {
    }
}
