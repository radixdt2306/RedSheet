using RedSheet.ViewModels.Models;
using System.Collections.Generic;

namespace RedSheet.Infrastructure.Security
{
    public static class ApplicationPermission
    {
        public static Dictionary<string, Dictionary<int, SubModuleModel>> RoleAccess = new Dictionary<string, Dictionary<int, SubModuleModel>>();
    }
}
