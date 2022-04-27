using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectStakeholderLookupUow : CoreUnitOfWork, IProjectStakeholderLookupUow
    {
        public ProjectStakeholderLookupUow(IProjectStakeholderLookupContext projectStakeholderLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectStakeholderLookupContext, repositoryProvider);
        }
    }

    public interface IProjectStakeholderLookupUow : ICoreUnitOfWork
    {
    }
}
