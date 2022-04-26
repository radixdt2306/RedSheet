using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectPowerUow : CoreUnitOfWork, IProjectPowerUow
    {
        public ProjectPowerUow(IProjectPowerContext projectPowerContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectPowerContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectPowerUow : ICoreUnitOfWork
    {
    }
}
