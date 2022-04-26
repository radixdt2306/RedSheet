using RedSheet.BoundedContext;
using Rx.Core.Data;
namespace RedSheet.UnitOfWork
{
    public class ExceptionUow : CoreUnitOfWork, IExceptionUow
    {
        public ExceptionUow(IExceptionContext exceptionContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(exceptionContext, repositoryProvider);
        }
    }


    public interface IExceptionUow : ICoreUnitOfWork
    {
    }
}
