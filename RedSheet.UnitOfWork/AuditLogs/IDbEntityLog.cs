using Microsoft.EntityFrameworkCore;
using RedSheet.DbEntities.Models;

namespace RedSheet.UnitOfWork.AuditLogs
{
    public interface IDbEntityLog
    {
        AuditRequest RequestLog();
        AuditRecord Log(object newEntity, object oldEntity, EntityState entityState);
    }
}
