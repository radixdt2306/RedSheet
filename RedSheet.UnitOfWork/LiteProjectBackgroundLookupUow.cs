using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class LiteProjectBackgroundLookupUow : CoreUnitOfWork, ILiteProjectBackgroundLookupUow
    {
        public LiteProjectBackgroundLookupUow(ILiteProjectBackgroundLookupContext liteProjectBackgroundLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(liteProjectBackgroundLookupContext, repositoryProvider);
        }
    }

    public interface ILiteProjectBackgroundLookupUow : ICoreUnitOfWork
    {
    }
}
