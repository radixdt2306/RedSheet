using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using RedSheet.BoundedContext;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Security;
using Rx.Core.Data;
using System;
using System.Diagnostics;
using System.Linq;
using RedSheet.ViewModels.Models;                 
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace RedSheet.Infrastructure.Filters
{
    public class ProjectUpdate : ActionFilterAttribute       
    {
        private MainSqlDbContext MainContext { get; set; }

        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

        public ProjectUpdate(IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            DbContextManager = dbContextManager;
            //RequestWatch = new Stopwatch();         
        }                                    

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var request = context.HttpContext.Request;

            if (request.Method == "POST" || request.Method == "PUT" || request.Method == "DELETE" ) {
                StringValues projectModuleId;
                var serviceUri = context.HttpContext.Request.Path.Value;
                var isProject = serviceUri.Contains("Projects");
                var isController = serviceUri.Contains("ProjectModules");
                StringValues requestMethod = request.Method;
                StringValues URL = request.Headers["Referer"];
                if (request.Headers.TryGetValue("x-project-module-id", out projectModuleId)) {
                    var spParameters = new object[5];
                    if (isProject == false)
                    {
                        if (projectModuleId != "undefined")
                        {
                            spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = Convert.ToInt32(projectModuleId.ToString()) };
                        }
                        else
                        {
                            spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = 0 };
                        }
                    }
                    else
                    {
                        spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = 0 };
                    }
                    spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
                    spParameters[2] = new SqlParameter() { ParameterName = "RequestMethod", Value = request.Method };
                    spParameters[3] = new SqlParameter() { ParameterName = "URL", Value = URL.ToString() };
                    spParameters[4] = new SqlParameter() { ParameterName = "IsController", Value = isController };
                    //var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.sp_ProjectUpdate @projectModuleId,@UserId", spParameters);
                    var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spProjectUpdate @projectModuleId,@UserId,@requestMethod,@URL,@isController", spParameters);
                }
                
            }
            
            //return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
            //return storeProcSearchResult.SingleOrDefault()?.Result;

            //Handle exception
        }
    }
}
                                                                                                           