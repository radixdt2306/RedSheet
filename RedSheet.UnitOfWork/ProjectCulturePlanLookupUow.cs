using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ProjectCulturePlanLookupUow : CoreUnitOfWork, IProjectCulturePlanLookupUow
    {
        public ProjectCulturePlanLookupUow(IProjectCulturePlanLookupContext projectCulturePlanLookupContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(projectCulturePlanLookupContext, repositoryProvider);
        }
    }

    public interface IProjectCulturePlanLookupUow : ICoreUnitOfWork
    {
    }
}
