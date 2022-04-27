using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectModuleLookupUow : CoreUnitOfWork, IProjectModuleLookupUow
    {
        public ProjectModuleLookupUow(IProjectModuleLookupContext projectModuleLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectModuleLookupContext, repositoryProvider);
        }
    }

    public interface IProjectModuleLookupUow : ICoreUnitOfWork
    {
    }
}
