using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectCultureUow : CoreUnitOfWork, IProjectCultureUow
    {
        public ProjectCultureUow(IProjectCultureContext projectCultureContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectCultureContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectCultureUow : ICoreUnitOfWork
    {
    }
}
