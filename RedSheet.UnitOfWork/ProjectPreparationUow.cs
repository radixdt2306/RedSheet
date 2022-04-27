using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectPreparationUow : CoreUnitOfWork, IProjectPreparationUow
    {
        public ProjectPreparationUow(IProjectPreparationContext projectPreparationContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectPreparationContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectPreparationUow : ICoreUnitOfWork
    {
    }
}
