using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext;
using Rx.Core.Data;

namespace RedSheet.UnitOfWork
{
    public class LoginUow : CoreUnitOfWork, ILoginUow
    {
        public LoginUow(ILoginContext loginContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(loginContext, repositoryProvider);
        }

        protected override void StateChange<TEntity>(TEntity entity, EntityState entityState)
        {
            //AuditUow.Log<TEntity>(entity, entityState);
            base.StateChange<TEntity>(entity, entityState);
        }
    }

    public interface ILoginUow : ICoreUnitOfWork
    {
    }
}
