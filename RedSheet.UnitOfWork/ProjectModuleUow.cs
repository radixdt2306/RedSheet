using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectModuleUow : CoreUnitOfWork, IProjectModuleUow
    {
        public ProjectModuleUow(IProjectModuleContext projectModuleContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectModuleContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectModuleUow : ICoreUnitOfWork
    {
    }
}
