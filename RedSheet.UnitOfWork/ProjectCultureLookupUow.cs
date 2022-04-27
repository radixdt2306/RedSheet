using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectCultureLookupUow : CoreUnitOfWork, IProjectCultureLookupUow
    {
        public ProjectCultureLookupUow(IProjectCultureLookupContext projectCultureLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectCultureLookupContext, repositoryProvider);
        }
    }

    public interface IProjectCultureLookupUow : ICoreUnitOfWork
    {
    }
}
