using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.Infrastructure.Filters;
using Rx.Core.Cache;
using Rx.Core.Security;
using Rx.Core.Security.Filters;
using Rx.Core.Settings;
using System.IO.Compression;

namespace RedSheet.Api
{

    public class ConfigurationService
    {
        public static void Register(IServiceCollection services, IConfigurationRoot configuration, string path)
        {
            SetCQRSPolicy(services);
            SetGzipCompression(services);
            AddDbContext(services);
            CoreServices.Register(services, configuration, path);
            ContextServices.Register(services, configuration);
            UnitOfWorkServices.Register(services, configuration);
            DomainServices.Register(services);
            //CoreServices.RegisterApplicationService(services, configuration);
            //CoreServices.RegisterSingleton(services, path);
            AddMvcOptions(services);
        }

        private static void SetCQRSPolicy(IServiceCollection services) {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
        }

        private static void SetGzipCompression(IServiceCollection services) {
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
            });
        }

        static void AddDbContext(IServiceCollection services) {
            services.AddDbContext<MainSqlDbContext>();
            services.AddDbContext<AdminSqlDbContext>();
            services.AddDbContext<CacheSqlDbContext>();
            services.AddDbContext<LogSqlDbContext>();
        }

        static void AddMvcOptions(IServiceCollection services) {
            var manager = new ApplicationPartManager();
            manager.ApplicationParts.Add(new AssemblyPart(typeof(Startup).Assembly));
            services.AddSingleton(manager);
            services.AddMvc(options =>
            {
                var logSqlDbContext = services.BuildServiceProvider().GetService<LogSqlDbContext>();
                var applicationCache = services.BuildServiceProvider().GetService<IApplicationCache>();
                var serverSetting = services.BuildServiceProvider().GetService<ServerSetting>();
                options.InputFormatters.Insert(0, new ApplicationInputFormatter());
                options.Filters.Add(new ModelValidation());
                options.Filters.Add(new ActiveSession());
                options.Filters.Add(new LogRequest(logSqlDbContext));
               // options.Filters.Add(new ApplicationETag(applicationCache,serverSetting));
            }).AddDataAnnotationsLocalization().AddJsonOptions(
                oo =>
                {
                    var resolver = new CamelCasePropertyNamesContractResolver();
                    if (resolver != null)
                    {
                        var res = resolver as DefaultContractResolver;
                        res.NamingStrategy = null;
                    }
                    oo.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
        }
    }
}
