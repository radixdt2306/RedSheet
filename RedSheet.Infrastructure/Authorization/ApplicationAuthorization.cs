using Microsoft.AspNetCore.Http;
using RedSheet.Infrastructure.Authorization;
using RedSheet.ViewModels.Models;
using Rx.Core.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace RedSheet.Infrastructure.Security
{
    public class ApplicationAuthorization : IApplicationAuthorization
    {
        private IUserAuthorization UserAuthorization { get; set; }
        
        public ApplicationAuthorization(IUserAuthorization userAuthorization)
        {
            UserAuthorization = userAuthorization;
        }

        public bool Validate()
        {
            return true;
        }

        public bool CheckAccessItem(AccessItemModel accessItem, string method, HttpContext context)
        {
            bool? isAccess = false;
            switch (method)
            {
                case "GET":
                    isAccess = accessItem.CanView;
                    break;
                case "POST":
                    isAccess = accessItem.CanAdd;
                    break;
                case "PUT":
                    isAccess = accessItem.CanEdit;
                    break;
                case "DELETE":
                    isAccess = accessItem.CanDelete;
                    break;
            }
            if (context.Request.Path.Value.Contains("validations/"))
            {
                isAccess = true;
            }

            //return Convert.ToBoolean(isAccess);
            return true;
        }

        public Dictionary<string, object> Validate(HttpContext context)
        {   
            var dicObject = new Dictionary<string, object>();
            bool isAccess = false;
            dicObject["Status"] = isAccess;
            int applicationModuleId = 0;
            if (context.Request.Path.Value.Contains("lookups"))
            {
                dicObject["Status"] = true;
                return dicObject;
            }
            if (context.Request.Headers.ContainsKey("x-application-module"))
            {
                context.Items["ApplicationModuleId"] = context.Request.Headers["x-application-module"];
                applicationModuleId = Convert.ToInt32(context.Request.Headers["x-application-module"]);
            }
            Dictionary<int, SubModuleModel> accessModule = null;
            ApplicationPermission.RoleAccess.TryGetValue(UserClaim.Get(ClaimTypes.Role), out accessModule);
            if (accessModule == null)
            {
                UserAuthorization.GetAccessModules(applicationModuleId, Convert.ToInt32(UserClaim.Get(ClaimTypes.Role)));
                ApplicationPermission.RoleAccess.TryGetValue(UserClaim.Get(ClaimTypes.Role), out accessModule);
            }
            SectionModel section = null;
            if (accessModule != null)
            {
                if (applicationModuleId != 0)
                {
                    SubModuleModel subModule;
                    accessModule.TryGetValue(applicationModuleId, out subModule);
                    if (subModule == null)
                    {
                        dicObject["Status"] = true; //Changes for User Profile
                        return dicObject;
                    }
                    var childModuleName = string.Empty;
                    if (context.Request.Headers.ContainsKey("x-child-module-name"))
                        childModuleName = context.Request.Headers["x-child-module-name"];
                    if (!string.IsNullOrEmpty(childModuleName))
                        section = subModule.Sections.SingleOrDefault(t => t.SectionName == childModuleName);
                    if (section != null)
                        isAccess = CheckAccessItem(section.AccessItems.First(), context.Request.Method, context);
                    else
                        isAccess = CheckAccessItem(subModule.AccessItems.First(), context.Request.Method, context);
                    context.Items["ApplicationModuleId"] = (section != null) ? section.ApplicationModuleId : Convert.ToInt32(applicationModuleId);
                }
            }
            dicObject["Status"] = isAccess;
            return dicObject;
        }
    }
}
