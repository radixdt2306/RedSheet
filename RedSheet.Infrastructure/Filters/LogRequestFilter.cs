using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using RedSheet.BoundedContext;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Models;
using Rx.Core.Security;
using System;
using System.Diagnostics;
using System.Linq;

namespace RedSheet.Infrastructure.Filters
{
    public class LogRequest : ActionFilterAttribute
    {
        private LogRequestContext LogContext { get; set; }

        private RequestLog RequestLog { get; set; }

        private Stopwatch RequestWatch { get; set; }
        public LogRequest(LogSqlDbContext logSqlDbContext)
        {
            LogContext = new LogRequestContext(logSqlDbContext);
            RequestWatch = new Stopwatch();

        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            RequestWatch.Start();
            var applicationModuleId = context.HttpContext.Request.Headers.ContainsKey("x-application-module") ? context.HttpContext.Request.Headers["x-application-module"].ToString() : "0";
            var recordId = context.HttpContext.Request.Headers.ContainsKey("x-record") ? context.HttpContext.Request.Headers["x-record"].ToString() : "0";
            var parameters = string.Empty;
            if (context.ActionArguments.Count() > 0)
                parameters = JsonConvert.SerializeObject(context.ActionArguments.First().Value);
            var cookies = context.HttpContext.Request.Cookies.ToDictionary(x => x.Key, y => y.Value);
            var authorization = context.HttpContext.Request.Headers.ContainsKey("Authorization") ? context.HttpContext.Request.Headers["Authorization"].ToString() : string.Empty;
            RequestLog = new RequestLog
            {
                ApplicationModuleId = Convert.ToInt32(applicationModuleId),
                RecordId = Convert.ToInt32(recordId),
                BrowserName = context.HttpContext.Request.Headers["User-Agent"].ToString(),
                ClientIPAddress = string.Empty,
                Parameters = parameters,
                RequestTime = DateTime.UtcNow,
                ServiceUri = context.HttpContext.Request.Path.Value,
                UserId = UserClaim.UserId,
                RequestMethod = context.HttpContext.Request.Method,
                Cookies = JsonConvert.SerializeObject(cookies),
                AuthorizationHeader = authorization
            };
            base.OnActionExecuting(context);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            
            //RequestWatch.Stop();
            //RequestLog.TotalDuration = RequestWatch.Elapsed;
            //RequestLog.ResponseStatusCode = context.HttpContext.Response.StatusCode;
            //LogContext.AddAsync(RequestLog).Wait();
            //LogContext.SaveChangesAsync().Wait();
            //LogContext.Dispose();
        }
    }
}
