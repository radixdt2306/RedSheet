using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Logging;
using RedSheet.Api.Controllers;
using RedSheet.Api.Controllers.Api;
using RedSheet.Infrastructure.Authorization;
using RedSheet.Infrastructure.ExceptionLogs;
using RedSheet.Infrastructure.Security;
using Rx.Core.Security;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace RedSheet.Api
{

    public class ApplicationConfiguration
    {
        public static void Configure(IApplicationBuilder applicationBuilder, IHostingEnvironment hostingEnvironment, ILoggerFactory loggerFactory)
        {
            applicationBuilder.UseCors("CorsPolicy");

            if (hostingEnvironment.IsDevelopment())
            {
                applicationBuilder.UseDeveloperExceptionPage();
            }
            RegisterGlobalException(applicationBuilder);

            ApplySecurityHeaders(applicationBuilder);

            ApplyTokenSecurity(applicationBuilder);

            applicationBuilder.UseResponseCompression();
            applicationBuilder.UseMvc();

        }

        static void ApplySecurityHeaders(IApplicationBuilder applicationBuilder)
        {
            applicationBuilder.Use((context, next) =>
            {
                context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
                context.Response.Headers["X-Frame-Options"] = "SameOrigin";
                context.Response.Headers["X-Content-Type-Options"] = "nosniff";
                context.Response.Headers["Strict-Transport-Security"] = "max-age=31536000";
                return next();
            });
            applicationBuilder.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
        }

        static void ApplyTokenSecurity(IApplicationBuilder applicationBuilder)
        {
            applicationBuilder.UseJwtAuthentication(
                new ApplicationAuthorization((IUserAuthorization)applicationBuilder.ApplicationServices.GetService(typeof(IUserAuthorization))),
                ApplicationApi.AuthenitcationByPass(),
                ApplicationApi.AuthorizationByPass());
        }

        static void RegisterGlobalException(IApplicationBuilder applicationBuilder) {
            applicationBuilder.UseExceptionHandler(
                 options =>
                 {
                     options.Run(
                     async context =>
                     {
                         context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                         context.Response.ContentType = "text/html";
                         var ex = context.Features.Get<IExceptionHandlerFeature>();
                         if (ex != null)
                         {
                                 var logException = (ILogException)context.RequestServices.GetService(typeof(ILogException));
                                 var err = logException.Log(ex.Error,context.Request.Path.Value);
                                 await context.Response.Body.WriteAsync(Encoding.ASCII.GetBytes(err), 0, err.Length).ConfigureAwait(false);
                             
                         }
                     });
                 });
        }
    }
}
