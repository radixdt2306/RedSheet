using RedSheet.BoundedContext;
using Rx.Core.Data;
namespace RedSheet.UnitOfWork
{
    public class LanguageContentUow : CoreUnitOfWork, ILanguageContentUow
    {
        public LanguageContentUow(ILanguageContentContext languageContext, IRepositoryProvider repositoryProvider)
        {
            base.SetContextRepository(languageContext, repositoryProvider);
        }
    }


    public interface ILanguageContentUow : ICoreUnitOfWork
    {
    }
}
