using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectBackgroundLookupUow : CoreUnitOfWork, IProjectBackgroundLookupUow
    {
        public ProjectBackgroundLookupUow(IProjectBackgroundLookupContext projectBackgroundLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectBackgroundLookupContext, repositoryProvider);
        }
    }

    public interface IProjectBackgroundLookupUow : ICoreUnitOfWork
    {
    }
}
