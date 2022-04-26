using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class NanoScopeToNegotiateObjectiveUow : CoreUnitOfWork, INanoScopeToNegotiateObjectiveUow
    {
        public NanoScopeToNegotiateObjectiveUow(INanoScopeToNegotiateObjectiveContext nanoScopeToNegotiateObjectiveContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(nanoScopeToNegotiateObjectiveContext, repositoryProvider,auditLog);
        }
    }

    public interface INanoScopeToNegotiateObjectiveUow : ICoreUnitOfWork
    {
    }
}
