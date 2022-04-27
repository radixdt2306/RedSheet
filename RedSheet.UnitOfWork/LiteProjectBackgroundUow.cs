using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class LiteProjectBackgroundUow : CoreUnitOfWork, ILiteProjectBackgroundUow
    {
        public LiteProjectBackgroundUow(ILiteProjectBackgroundContext liteProjectBackgroundContext, IRepositoryProvider repositoryProvider,IAuditLog auditLog)
        {
            base.SetContextRepository(liteProjectBackgroundContext, repositoryProvider, auditLog);
        }
    }

    public interface ILiteProjectBackgroundUow : ICoreUnitOfWork
    {
    }
}
