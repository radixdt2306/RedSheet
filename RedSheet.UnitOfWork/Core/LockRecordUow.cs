using RedSheet.BoundedContext;
using Rx.Core.Data;

namespace RedSheet.UnitOfWork
{
    public class LockRecordUow : CoreUnitOfWork, ILockRecordUow
    {
        public LockRecordUow(ILockRecordContext lockRecordContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(lockRecordContext, repositoryProvider);
        }
    }

    public interface ILockRecordUow : ICoreUnitOfWork
    {
    }
}
