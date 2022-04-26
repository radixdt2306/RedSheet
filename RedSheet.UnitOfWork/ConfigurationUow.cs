using Rx.Core.Data;
using RedSheet.BoundedContext;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RedSheet.UnitOfWork
{
    public class ConfigurationUow : CoreUnitOfWork, IConfigurationUow
    {
        public ConfigurationUow(IConfigurationContext configurationContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(configurationContext, repositoryProvider);
        }
    }

    public interface IConfigurationUow : ICoreUnitOfWork
    {
    }
}
