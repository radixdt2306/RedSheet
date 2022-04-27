using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectCulturePlanUow : CoreUnitOfWork, IProjectCulturePlanUow
    {
        public ProjectCulturePlanUow(IProjectCulturePlanContext projectCulturePlanContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectCulturePlanContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectCulturePlanUow : ICoreUnitOfWork
    {
    }
}
