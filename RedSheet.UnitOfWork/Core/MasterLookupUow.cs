using RedSheet.BoundedContext;
using Rx.Core.Data;

namespace RedSheet.UnitOfWork
{
    public class MasterLookupUow : CoreUnitOfWork, IMasterLookupUow
    {
        public MasterLookupUow(IMasterLookupContext masterLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(masterLookupContext, repositoryProvider);
        }
    }

    public interface IMasterLookupUow : ICoreUnitOfWork
    {
    }
}
