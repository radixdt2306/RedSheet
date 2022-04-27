using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectPowerLookupUow : CoreUnitOfWork, IProjectPowerLookupUow
    {
        public ProjectPowerLookupUow(IProjectPowerLookupContext projectPowerLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectPowerLookupContext, repositoryProvider);
        }
    }

    public interface IProjectPowerLookupUow : ICoreUnitOfWork
    {
    }
}
