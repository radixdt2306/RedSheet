using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectRequirementLookupUow : CoreUnitOfWork, IProjectRequirementLookupUow
    {
        public ProjectRequirementLookupUow(IProjectRequirementLookupContext projectRequirementLookupContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectRequirementLookupContext, repositoryProvider, auditLog);
        }
    }

    public interface IProjectRequirementLookupUow : ICoreUnitOfWork
    {
    }
}
