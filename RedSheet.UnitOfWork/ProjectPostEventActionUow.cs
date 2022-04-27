using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectPostEventActionUow : CoreUnitOfWork, IProjectPostEventActionUow
    {
        public ProjectPostEventActionUow(IProjectPostEventActionContext projectPostEventActionContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectPostEventActionContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectPostEventActionUow : ICoreUnitOfWork
    {
    }
}
