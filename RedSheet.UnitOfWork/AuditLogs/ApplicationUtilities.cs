using Rx.Core.Data.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;

namespace RedSheet.UnitOfWork.AuditLogs
{
    public static class ApplicationUtilities
    {
        public static object GetValue(object entity, string key)
        {
            try
            {
                var value = entity.GetType().GetProperty(entity.GetType().Name + key).GetValue(entity);
                return value;
            }
            catch (Exception ex)
            {
                if (key == "Name")
                    return "";
                throw ex;
            }
        }

        public static Dictionary<string, object> GetProperties(object entity)
        {
            return entity.GetType().GetProperties().Where(t => !t.Name.IsAuditableProperty() && !t.IsNotMappedProperty()).Select(t => new
            {
                Name = t.Name,
                Value = t.GetValue(entity)
            }).ToDictionary(x => x.Name, x => x.Value);
        }

        public static Dictionary<string, object> GetRelationshipTableKeys(object entity)
        {
            return entity.GetType().GetProperties().Select(t => new
            {
                Name = t.Name,
                TableName = t.GetCustomAttributes(typeof(RelationshipTableAttribue), false).SingleOrDefault()
            }).Where(t => t.TableName != null).ToDictionary(x => x.Name, x => x.TableName);
        }

        public static bool IsAuditableProperty(this string value)
        {
            var properties = new string[] { "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn" };
            return properties.Where(t => t == value).Count() > 0;
        }

        public static bool IsNotMappedProperty(this  PropertyInfo value)
        {
            var customAttribute = value.GetCustomAttribute(typeof(NotMappedAttribute));
            return customAttribute != null;
        }
    }
}
