using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using RedSheet.BoundedContext;
using RedSheet.Domain.Users;
using RedSheet.Infrastructure.Authorization;
using RedSheet.Infrastructure.ExceptionLogs;
using RedSheet.Infrastructure.Multilingual;
using RedSheet.Infrastructure.RequestContext;
using RedSheet.Infrastructure.Security;
using RedSheet.Infrastructure.Utilities;
using RedSheet.UnitOfWork;
using RedSheet.UnitOfWork.AuditLogs;
using Rx.Core.Cache;
using Rx.Core.Data;
using Rx.Core.Security.Jwt;
using Rx.Core.Settings;
using RedSheet.Domain.Roles;
using RedSheet.Domain.EmailTemplates;
using RedSheet.Domain.Core.ModuleMasters;
using RedSheet.Domain.RolePermissions;
using RedSheet.Domain.MemberShipService;
using RedSheet.Domain.ClientServiceModule;
using System.ServiceModel;
using System;

namespace RedSheet.Api
{
    public class CoreServices
    {
        public static void Register(IServiceCollection services, IConfigurationRoot configuration, string path)
        {
            //Microsoft Core Services
            services.AddSingleton<IConfiguration>(_ => configuration);
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            
            //Rx Core Services
            services.AddScoped<IRepositoryProvider, RepositoryProvider>();
            services.AddScoped<ITokenProvider, TokenProvider>();
            services.AddScoped<IRequestAccessor, RequestAccessor>();

            services.AddScoped(typeof(IDbContextManager<>), typeof(DbContextManager<>));

            RegisterApplicationService(services, configuration);
            RegisterSingleton(services, path);
            
        }
        public static void RegisterApplicationService(IServiceCollection services, IConfigurationRoot configuration)
        {
            //Application Services
            services.AddScoped<ICacheContext, CacheContext>();
            services.AddScoped<ILoginContext, LoginContext>();
            services.AddScoped<IAuditContext, AuditContext>();
            services.AddScoped<IMasterContext, MasterContext>();
            services.AddScoped<IMasterLookupContext, MasterLookupContext>();
            services.AddScoped<ILanguageContentContext, LanguageContentContext>();
            services.AddScoped<IExceptionContext, ExceptionContext>();
            services.AddScoped<ILoginUow, LoginUow>();
            services.AddScoped<IMasterUow, MasterUow>();
            services.AddScoped<IMasterLookupUow, MasterLookupUow>();
            services.AddScoped<IAuditLog, AuditUow>();
            services.AddScoped<IExceptionUow, ExceptionUow>();
            services.AddScoped<ILanguageContentUow, LanguageContentUow>();
            services.AddScoped<ILogException, LogException>();
            services.AddScoped<IUserAuthorization, UserAuthorization>();
            services.AddScoped<ILanguageContent, LanguageContent>();
            services.AddScoped<IPasswordHash, PasswordHash>();
            services.AddScoped<IDbEntityLog, DbEntityLog>();

            services.AddScoped<IUserUow, UserUow>();
            services.AddScoped<IUserContext, UserContext>();

            services.AddScoped<ILockRecordContext, LockRecordContext>();
            services.AddScoped<ILockRecordUow, LockRecordUow>();

            services.AddScoped<IGeneratorContext, POCOGeneratorContext>();
            services.AddScoped<IGeneratorUow, GeneratorUow>();
            services.AddScoped<IUserDomain, UserDomain>();
            services.AddScoped<IRoleDomain, RoleDomain>();
            services.AddScoped<IRolePermissionsDomain, RolePermissionsDomain>();
            services.AddScoped<IEmailTemplateDomain, EmailTemplateDomain>();
            services.AddScoped<IModuleMasterDomain, ModuleMasterDomain>();

            
        }


        public static void RegisterSingleton(IServiceCollection services, string path)
        {
            var clientSetting = new ClientSetting(JObject.Parse(GetJson(path,"client-settings")));
            var serverSetting = new ServerSetting(JObject.Parse(GetJson(path,"server-settings")));
            var basicBinding = new BasicHttpBinding();
            basicBinding.MaxReceivedMessageSize = Int32.MaxValue;
            basicBinding.MaxBufferSize = Int32.MaxValue;
            var endPointAddress =new EndpointAddress("http://positivedev.co.uk:9876/membershipservice");
            // var endPointAddress =new EndpointAddress("http://localhost:9876/MembershipService");
            var clientServiceContext = new ClientServiceContext(basicBinding, endPointAddress);
            services.AddSingleton<ClientServiceContext>(_ => clientServiceContext);
            services.AddSingleton<ClientSetting>(_ => clientSetting);
            services.AddSingleton<ServerSetting>(_ => serverSetting);
            services.AddSingleton<IApplicationCache, ApplicationCache>();
            services.AddScoped<IApplicationUtility, ApplicationUtility>();
        }

        private static string GetJson(string path, string fileName)
        {
            return System.IO.File.ReadAllText(string.Format(@"{0}\{1}.json", path, fileName));
        }
    }
}
