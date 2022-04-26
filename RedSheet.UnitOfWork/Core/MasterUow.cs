using RedSheet.BoundedContext;
using Rx.Core.Data;

namespace RedSheet.UnitOfWork
{
    public class MasterUow : CoreUnitOfWork, IMasterUow
    {
        public MasterUow(IMasterContext masterContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(masterContext, repositoryProvider,auditLog);
        }
    }

    public interface IMasterUow : ICoreUnitOfWork
    {
    }
}
