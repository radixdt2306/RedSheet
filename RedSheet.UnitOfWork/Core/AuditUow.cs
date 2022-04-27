using Microsoft.EntityFrameworkCore;
using RedSheet.BoundedContext;
using RedSheet.DbEntities.Models;
using RedSheet.UnitOfWork.AuditLogs;
using Rx.Core.Data;
using System.Collections.Generic;

namespace RedSheet.UnitOfWork
{
    public class AuditUow : CoreUnitOfWork, IAuditUow
    {
        public AuditUow(IAuditContext auditContext, IRepositoryProvider repositoryProvider, IDbEntityLog dbEntityLog)
        {
            this.DbEntityLog = dbEntityLog;
            base.SetContextRepository(auditContext, repositoryProvider);
        }

        public void RequestLog()
        {
            this.AuditRequest = this.DbEntityLog.RequestLog();
        }

        public void EntityLog(object entity, EntityState entityState, object dbEntity)
        {
            var auditRecord = this.DbEntityLog.Log(entity, dbEntity, entityState);
            this.AuditRequest.AuditRecords.Add(auditRecord);
        }

        public void SaveChanges()
        {
           
        }

        int IAuditLog.SaveChanges()
        {
            if (this.AuditRequest != null) {
                this.RegisterNew<AuditRequest>(this.AuditRequest);
                Context.SaveChanges();
            }
            return 0;
        }

        private IDbEntityLog DbEntityLog { get; set; }

        private List<AuditRecord> AuditRecords { get; set; }

        private AuditRequest AuditRequest { get; set; }
    }


    public interface IAuditUow : ICoreUnitOfWork, IAuditLog
    {
        
    }
}
