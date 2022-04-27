using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectRequirementUow : CoreUnitOfWork, IProjectRequirementUow
    {
        public ProjectRequirementUow(IProjectRequirementContext projectRequirementContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectRequirementContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectRequirementUow : ICoreUnitOfWork
    {
    }
}
