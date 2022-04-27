using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ScheduleEmailUow : CoreUnitOfWork, IScheduleEmailUow
    {
        public ScheduleEmailUow(IScheduleEmailContext scheduleEmailContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(scheduleEmailContext, repositoryProvider,auditLog);
        }
    }

    public interface IScheduleEmailUow : ICoreUnitOfWork
    {
    }
}
