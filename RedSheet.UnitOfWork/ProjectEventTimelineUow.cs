using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectEventTimelineUow : CoreUnitOfWork, IProjectEventTimelineUow
    {
        public ProjectEventTimelineUow(IProjectEventTimelineContext projectEventTimelineContext, IRepositoryProvider repositoryProvider, IAuditLog auditLog)
        {
            base.SetContextRepository(projectEventTimelineContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectEventTimelineUow : ICoreUnitOfWork
    {
    }
}
