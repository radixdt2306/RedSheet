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
	public class LockRecordFilter : ActionFilterAttribute
	{
		private MainSqlDbContext MainContext { get; set; }

		private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }

		public LockRecordFilter(IDbContextManager<MainSqlDbContext> dbContextManager)
		{
			DbContextManager = dbContextManager;
			//RequestWatch = new Stopwatch();         
		}

		public override void OnActionExecuted(ActionExecutedContext context)
		{
			//try
			//{


				var request = context.HttpContext.Request;

				if (request.Method == "PUT")
				{
					StringValues projectModuleId;
					if (request.Headers.TryGetValue("x-project-module-id", out projectModuleId))
					{
						if (projectModuleId != "undefined")
						{
							var spParameters = new object[2];
							spParameters[0] = new SqlParameter() { ParameterName = "ProjectModuleId", Value = Convert.ToInt32(projectModuleId) };
							spParameters[1] = new SqlParameter() { ParameterName = "UserId", Value = UserClaim.UserId };
							//var storeProcSearchResult = await DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.sp_ProjectUpdate @projectModuleId,@UserId", spParameters);
							var storeProcSearchResult = DbContextManager.SqlQueryAsync<StoreProcSearchViewModel>("EXEC dbo.spLockProject @projectModuleId,@UserId", spParameters).Result;
						}
					}

				}
			//}
			//catch (Exception)
			//{

			//	throw;
			//}

			//return Ok(storeProcSearchResult.SingleOrDefault()?.Result);
			//return storeProcSearchResult.SingleOrDefault()?.Result;

			//Handle exception
		}
	}
}
