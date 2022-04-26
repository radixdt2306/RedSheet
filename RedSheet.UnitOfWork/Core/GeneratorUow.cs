using RedSheet.BoundedContext;
using Rx.Core.Data;

namespace RedSheet.UnitOfWork
{
    public class GeneratorUow : CoreUnitOfWork, IGeneratorUow
    {
        public GeneratorUow(IGeneratorContext generatorContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(generatorContext, repositoryProvider);
        }
    }

    public interface IGeneratorUow : ICoreUnitOfWork
    {
    }
}
