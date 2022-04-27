using Microsoft.AspNetCore.Http;
using System;

namespace RedSheet.Infrastructure.RequestContext
{
    public class RequestAccessor : IRequestAccessor
    {
        private IHttpContextAccessor ContextAccessor { get; set; }
        public RequestAccessor(IHttpContextAccessor contextAccessor) {
            ContextAccessor = contextAccessor;
        }

        public int ApplicationModuleId
        {
            get
            {
                var isExits = ContextAccessor.HttpContext.Request.Headers.ContainsKey("x-application-module");
                if (isExits)
                    return Convert.ToInt32(ContextAccessor.HttpContext.Request.Headers["x-application-module"]);
                return 0;
            }
        }

        public int MainRecordId
        {
            get
            {
                var isExits = ContextAccessor.HttpContext.Request.Headers.ContainsKey("x-record");
                if (isExits)
                    return Convert.ToInt32(ContextAccessor.HttpContext.Request.Headers["x-record"]);
                return 0;
            }
        }

        public int ChildModuleName
        {
            get
            {
                var isExits = ContextAccessor.HttpContext.Request.Headers.ContainsKey("x-child-module-name");
                if (isExits)
                    return Convert.ToInt32(ContextAccessor.HttpContext.Request.Headers["x-child-module-name"]);
                return 0;
            }
        }

        public string LanguageName
        {
            get
            {
                var isExits = ContextAccessor.HttpContext.Request.Headers.ContainsKey("x-language-name");
                if (isExits)
                    return ContextAccessor.HttpContext.Request.Headers["x-language-name"];
                return string.Empty;                
            }
        }



        public string this[string key]
        {
            get
            {
                var isExits = ContextAccessor.HttpContext.Request.Headers.ContainsKey(key);
                if (isExits)
                    return ContextAccessor.HttpContext.Request.Headers[key];
                return string.Empty;
            }
        }
    }
}
