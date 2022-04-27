using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class NanoScopeToNegotiateObjectiveLookupUow : CoreUnitOfWork, INanoScopeToNegotiateObjectiveLookupUow
    {
        public NanoScopeToNegotiateObjectiveLookupUow(INanoScopeToNegotiateObjectiveLookupContext nanoScopeToNegotiateObjectiveLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(nanoScopeToNegotiateObjectiveLookupContext, repositoryProvider);
        }
    }

    public interface INanoScopeToNegotiateObjectiveLookupUow : ICoreUnitOfWork
    {
    }
}
