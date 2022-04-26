using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class RecentActivityAndNotificationUow : CoreUnitOfWork, IRecentActivityAndNotificationUow
    {
        public RecentActivityAndNotificationUow(IRecentActivityAndNotificationContext recentActivityAndNotificationContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(recentActivityAndNotificationContext, repositoryProvider);
        }
    }

    public interface IRecentActivityAndNotificationUow : ICoreUnitOfWork
    {
    }
}
