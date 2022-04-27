using Newtonsoft.Json;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.Infrastructure.Security;
using RedSheet.ViewModels.Models;
using Rx.Core.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace RedSheet.Infrastructure.Authorization
{
    public class UserAuthorization : IUserAuthorization
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public UserAuthorization(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
        }
        public Dictionary<string, object> GetAccessModules(int applicationModuleId, int roleId)
        {
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter()
            {
                ParameterName = "RoleId",
                Value = roleId
            };

            spParameters[1] = new SqlParameter()
            {
                ParameterName = "ApplicationModuleId",
                Value = applicationModuleId
            };

            var result = DbContextManager.SqlQueryAsync<ModuleAccessModel>("EXEC dbo.spPermissions @RoleId, @ApplicationModuleId", spParameters).Result.ToList();
            var moduleMaster = JsonConvert.DeserializeObject<List<ModuleMasterViewModel>>(result.FirstOrDefault().ModuleAccess);
            var dicObject = new Dictionary<string, object>();
            //if (applicationModuleId == 0)
            //{
            var moduleMasters = moduleMaster.Where(t => t.SubModules != null);
            foreach (var module in moduleMasters)
            {
                var moduleItems = ModuleBinder(module);
                if (moduleItems.Keys.Count() > 0)
                    dicObject.Add(module.ApplicationModuleId.ToString(), moduleItems);
            }
            if (roleId != 0)
            {
                var stringRoleId = roleId.ToString();
                var stringModuleId = applicationModuleId.ToString();
                if (ApplicationPermission.RoleAccess.Keys.Where(t => t == stringRoleId).Count() == 0)
                {
                    ApplicationPermission.RoleAccess[stringRoleId] = new Dictionary<int, SubModuleModel>();
                }
                var roleModules = ApplicationPermission.RoleAccess[stringRoleId];
                var subModules = new List<SubModuleModel>();

                moduleMaster.ForEach(t =>
                {
                    if (t.SubModules != null)
                        t.SubModules.ForEach(x =>
                        {
                            roleModules[x.ApplicationModuleId] = x;
                        });
                });
                ApplicationPermission.RoleAccess[stringRoleId] = roleModules;
            }
            return dicObject;
            //}
            //else
            //    return ModuleBinder(moduleMaster.First());
        }

        private Dictionary<string, object> ModuleBinder(ModuleMasterViewModel moduleMaster)
        {
            var subModuleDic = new Dictionary<string, object>();
            foreach (var subModule in moduleMaster.SubModules)
            {
                subModuleDic.Add(subModule.ApplicationModuleId.ToString(), SubModuleBinder(subModule));
            }
            return subModuleDic;
        }

        private Dictionary<string, object> SubModuleBinder(SubModuleModel subModule)
        {
            var dicObject = new Dictionary<string, object>();
            if (subModule.AccessItems != null && subModule.AccessItems.Count > 0)
            {
                var dObject = SubModuleAccess(subModule.AccessItems);
                if (dObject != null)
                    dicObject = dObject;
            }
            if (subModule.Sections != null && subModule.Sections.Count > 0)
            {
                foreach (var section in subModule.Sections)
                {
                    if (section.AccessItems != null && section.AccessItems.Count > 0)
                    {
                        var dObject = SectionBinder(section);
                        if (dObject != null)
                        {
                            dicObject.Add(section.SectionName.ToLower().Replace(" ", "-"), dObject);
                        }

                    }
                }
            }
            return dicObject;

        }

        private Dictionary<string, object> SectionBinder(SectionModel sections)
        {
            var dicObject = new Dictionary<string, object>();
            dicObject = SubModuleAccess(sections.AccessItems);
            return dicObject;

        }
        private static Dictionary<string, object> SubModuleAccess(List<AccessItemModel> accessItems)
        {
            var accessItem = accessItems.First();
            var dicObject = new Dictionary<string, object>();
            if (accessItem.CanAdd != null)
                dicObject.Add("add", accessItem.CanAdd);
            if (accessItem.CanDelete != null)
                dicObject.Add("delete", accessItem.CanDelete);
            if (accessItem.CanView != null)
                dicObject.Add("list", accessItem.CanView);
            if (accessItem.CanEdit != null)
                dicObject.Add("edit", accessItem.CanEdit);
            return dicObject.Keys.Count > 0 ? dicObject : null;
        }
    }

    public interface IUserAuthorization
    {
        Dictionary<string, object> GetAccessModules(int moduleId, int roleId);
    }
}
