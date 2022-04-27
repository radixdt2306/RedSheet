using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectStakeholderUow : CoreUnitOfWork, IProjectStakeholderUow
    {
        public ProjectStakeholderUow(IProjectStakeholderContext projectStakeholderContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectStakeholderContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectStakeholderUow : ICoreUnitOfWork
    {
    }
}
