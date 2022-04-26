using RedSheet.BoundedContext;
using Rx.Core.Data;

namespace RedSheet.UnitOfWork
{
    public class UserUow : CoreUnitOfWork, IUserUow
    {
        public UserUow(IUserContext loginContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(loginContext, repositoryProvider, auditLog);
        }
    }

    public interface IUserUow : ICoreUnitOfWork
    {
    }
}
