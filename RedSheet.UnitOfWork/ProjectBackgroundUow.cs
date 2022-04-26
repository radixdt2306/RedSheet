using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectBackgroundUow : CoreUnitOfWork, IProjectBackgroundUow
    {
        public ProjectBackgroundUow(IProjectBackgroundContext projectBackgroundContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectBackgroundContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectBackgroundUow : ICoreUnitOfWork
    {
    }
}
