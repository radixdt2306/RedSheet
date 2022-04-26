using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectNegotionalityLookupUow : CoreUnitOfWork, IProjectNegotionalityLookupUow
    {
        public ProjectNegotionalityLookupUow(IProjectNegotionalityLookupContext projectNegotionalityLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectNegotionalityLookupContext, repositoryProvider);
        }
    }

    public interface IProjectNegotionalityLookupUow : ICoreUnitOfWork
    {
    }
}
