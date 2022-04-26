using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectNegotiationLookupUow : CoreUnitOfWork, IProjectNegotiationLookupUow
    {
        public ProjectNegotiationLookupUow(IProjectNegotiationLookupContext projectNegotiationLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectNegotiationLookupContext, repositoryProvider);
        }
    }

    public interface IProjectNegotiationLookupUow : ICoreUnitOfWork
    {
    }
}
