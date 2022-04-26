using RedSheet.BoundedContext.SqlContext;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace RedSheet.Infrastructure.Multilingual
{
    public class LanguageContent : ILanguageContent
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public LanguageContent(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }
        public Dictionary<string, Dictionary<string, string>> Get(int applicationModuleId, string actionType, string languageName)
        {
            var spParameters = new object[3];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "ApplicationModuleId",
                Value = applicationModuleId
            };
            spParameters[1] = new SqlParameter()
            {
                ParameterName = "Action",
                Value = actionType
            };
            spParameters[2] = new SqlParameter()
            {
                ParameterName = "LanguageName",
                Value = languageName
            };
            var result = DbContextManager.SqlQueryAsync<LanguageContentModel>("EXEC dbo.spLanguageContents @ApplicationModuleId, @Action, @LanguageName", spParameters).Result.ToList();
            var languageContent = new Dictionary<string, string>();
            var contentTypes = new Dictionary<string, Dictionary<string, string>>();
            var typeName = string.Empty;
            result.ForEach(t =>
            {
                if (typeName != t.Type && !string.IsNullOrEmpty(typeName))
                {
                    contentTypes.Add(typeName.ToLower(), languageContent);
                    languageContent = new Dictionary<string, string>();
                }
                languageContent.Add(t.Name, t.Text);
                typeName = t.Type;
            });
            contentTypes.Add(typeName.ToLower(), languageContent);
            return contentTypes;
        }


    }

    public interface ILanguageContent
    {
        Dictionary<string, Dictionary<string, string>> Get(int applicationModuleId, string action, string languageName);


    }
}
