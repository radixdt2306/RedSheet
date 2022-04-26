using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectLearningUow : CoreUnitOfWork, IProjectLearningUow
    {
        public ProjectLearningUow(IProjectLearningContext projectLearningContext, IRepositoryProvider repositoryProvider,IAuditLog auditLog)
        {
            base.SetContextRepository(projectLearningContext, repositoryProvider,auditLog);
        }
    }

    public interface IProjectLearningUow : ICoreUnitOfWork
    {
    }
}
