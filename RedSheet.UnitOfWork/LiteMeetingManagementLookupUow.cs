using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class LiteMeetingManagementLookupUow : CoreUnitOfWork, ILiteMeetingManagementLookupUow
    {
        public LiteMeetingManagementLookupUow(ILiteMeetingManagementLookupContext liteMeetingManagementLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(liteMeetingManagementLookupContext, repositoryProvider);
        }
    }

    public interface ILiteMeetingManagementLookupUow : ICoreUnitOfWork
    {
    }
}
