using Microsoft.AspNetCore.Mvc;
using RedSheet.Api.AppModels;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.Domain.ClientServiceModule;
using RedSheet.Infrastructure.Utilities;
using Rx.Core.Data;

namespace RedSheet.Api.Controllers
{
    public abstract class BaseController : Controller
    {
        public UnitOfWorkModel Uow { get; set; } = new UnitOfWorkModel();

        public DomainModel Domain { get; set; } = new DomainModel();

        public IApplicationUtility ApplicationUtility { get; set; }

        public ClientServiceContext ClientServiceContext { get; set; }

        public IDbContextManager<AdminSqlDbContext> AdminContextManager { get; set; }

        public IDbContextManager<MainSqlDbContext> MainContextManager { get; set; }

        public IDbContextManager<CacheSqlDbContext> CacheContextManager { get; set; }

        public IDbContextManager<LogSqlDbContext> LogContextManager { get; set; }

    }
}
