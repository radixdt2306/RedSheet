using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using RedSheet.DbEntities.Models;
using Rx.Core.Data.Attributes;
using Rx.Core.Security;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;

namespace RedSheet.UnitOfWork.AuditLogs
{
    public class DbEntityLog : IDbEntityLog
    {
        private IHttpContextAccessor ContextAccessor { get; set; }
        public DbEntityLog(IHttpContextAccessor httpContextAccessor)
        {
            ContextAccessor = httpContextAccessor;
        }

        public AuditRequest RequestLog()
        {
            var applicationModule = ContextAccessor.HttpContext.Request.Headers.SingleOrDefault(t => t.Key == "x-application-module").Value.ToString();
            //if (applicationModule != null)
            //    var applicationModuleId = (int)ContextAccessor.HttpContext.Items[];
            if (string.IsNullOrEmpty(applicationModule) && Convert.ToString(ContextAccessor.HttpContext.Request.Path).Contains("login"))
            {
                applicationModule = "33";
            }
            string mainRecordId = ContextAccessor.HttpContext.Request.Headers.ContainsKey("x-record") ? ContextAccessor.HttpContext.Request.Headers["x-record"] : new StringValues(0.ToString());

            var auditRequest = new AuditRequest
            {
                ApplicationModuleId = Convert.ToInt32(applicationModule),
                //ApplicationTimeZoneId = Convert.ToInt32(UserClaim.Get(ClaimTypes.Locality)),
                ApplicationTimeZoneId = 0,
                //ApplicationTimeZoneId = 1,
                UserId = UserClaim.UserId,
                Uri = ContextAccessor.HttpContext.Request.Path,
                MainRecordId = Convert.ToInt32(mainRecordId),
                CreatedDate = DateTime.UtcNow,
                RequestMethod = ContextAccessor.HttpContext.Request.Method
            };
            return auditRequest;
        }

        private Dictionary<string, object> GetProperties(object entity)
        {
            var entityProperties = entity.GetType().GetProperties();
            var dicProp = new Dictionary<string, object>();
            foreach (var property in entityProperties)
            {
                if (!property.PropertyType.IsClass && !property.PropertyType.IsArray && !property.PropertyType.IsInterface)
                {
                    dicProp.Add(property.Name, property.GetValue(entity));
                }
            }
            return dicProp;
        }

        public AuditRecord Log(object newEntity, object oldEntity, EntityState entityState)
        {
            TableAttribute tableAttr = newEntity.GetType().GetCustomAttributes(typeof(TableAttribute), false).SingleOrDefault() as TableAttribute;
            var keyValue = (int)ApplicationUtilities.GetValue(newEntity, "Id");
            var nameValue = (string)ApplicationUtilities.GetValue(newEntity, "Name");
            var applicationId = UserClaim.Get(ClaimTypes.Sid);
            var newEntityProps = this.GetProperties(newEntity);
            var oldEntityProps = new Dictionary<string, object>();
            if (oldEntity != null)
                oldEntityProps = this.GetProperties(oldEntity);

            var auditRecord = new AuditRecord
            {
                EventType = entityState.ToString(),
                TableName = tableAttr.Name,
                RecordId = keyValue,
                RecordName = nameValue,
                NewValue = JsonConvert.SerializeObject(newEntityProps),
            };
            switch (entityState)
            {
                case EntityState.Modified:
                    auditRecord.OldValue = JsonConvert.SerializeObject(oldEntityProps);
                    auditRecord.AuditRecordDetails = GetAuditRecordDetail(newEntity, oldEntity);
                    break;
                case EntityState.Added:
                case EntityState.Deleted:
                    if (ContextAccessor.HttpContext.Request.Method == "PUT")
                    {
                        var logProperty = newEntity.GetType().GetProperties().SingleOrDefault(p => p.GetCustomAttributes(typeof(LogPropertyAttribute), false).Count() > 0);
                        if (logProperty != null)
                        {
                            var relationshipTable = logProperty.GetCustomAttributes(typeof(RelationshipTableAttribue), false).SingleOrDefault() as RelationshipTableAttribue;
                            var logPropertyValue = logProperty.GetValue(newEntity);
                            var auditRecordDetail = new AuditRecordDetail
                            {
                                NewValue = EntityState.Added == entityState && logPropertyValue != null ? logPropertyValue.ToString() : null,
                                OldValue = EntityState.Deleted == entityState && logPropertyValue != null ? logPropertyValue.ToString() : null,
                                ReferenceTableName = relationshipTable != null ? string.Join(".", relationshipTable.Schema, relationshipTable.Name) : null,
                                ColumnName = logProperty.Name
                            };
                            auditRecord.AuditRecordDetails.Add(auditRecordDetail);
                        }
                    }
                    break;
            }
            return auditRecord;
        }

        private List<AuditRecordDetail> GetAuditRecordDetail(object newEntity, object oldEntity)
        {
            var auditRecordDetails = new List<AuditRecordDetail>();
            var oldValueProperties = ApplicationUtilities.GetProperties(oldEntity);
            var newValueProperties = ApplicationUtilities.GetProperties(newEntity);
            var relationShipTableKeys = ApplicationUtilities.GetRelationshipTableKeys(oldEntity);
            foreach (var property in oldValueProperties)
            {
                var oldValue = property.Value;
                var newValue = newValueProperties[property.Key];
                oldValue = oldValue == null ? "" : oldValue;
                newValue = newValue == null ? "" : newValue;
                if (oldValue.ToString() != newValue.ToString())
                {
                    var auditRecordDetail = new AuditRecordDetail
                    {
                        ColumnName = property.Key,
                        OldValue = Convert.ToString(oldValue),
                        NewValue = Convert.ToString(newValue),
                        ReferenceTableName = relationShipTableKeys.Keys.Contains(property.Key) ? string.Join(".", ((RelationshipTableAttribue)relationShipTableKeys[property.Key]).Schema, ((RelationshipTableAttribue)relationShipTableKeys[property.Key]).Name) : ""
                    };
                    auditRecordDetails.Add(auditRecordDetail);
                }
            }
            return auditRecordDetails;
        }
    }
}
