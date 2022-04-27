using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class LiteMeetingManagementUow : CoreUnitOfWork, ILiteMeetingManagementUow
    {
        public LiteMeetingManagementUow(ILiteMeetingManagementContext liteMeetingManagementContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(liteMeetingManagementContext, repositoryProvider, auditLog);
        }
    }

    public interface ILiteMeetingManagementUow : ICoreUnitOfWork
    {
    }
}
