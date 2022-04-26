using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectEventTimelineLookupUow : CoreUnitOfWork, IProjectEventTimelineLookupUow
    {
        public ProjectEventTimelineLookupUow(IProjectEventTimelineLookupContext projectEventTimelineLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectEventTimelineLookupContext, repositoryProvider);
        }
    }

    public interface IProjectEventTimelineLookupUow : ICoreUnitOfWork
    {
    }
}
