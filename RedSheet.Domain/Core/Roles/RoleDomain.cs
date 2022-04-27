using Rx.Core.Data;
using RedSheet.BoundedContext.SqlContext;
using RedSheet.DbEntities.Enums;
using RedSheet.DbEntities.Models;
using RedSheet.Infrastructure.Utilities;
using RedSheet.Infrastructure.ValidationMessages;
using RedSheet.Models.ViewModels;
using RedSheet.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Domain.Roles
{
    public class RoleDomain : IRoleDomain
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public RoleDomain(IMasterUow masterUow, IApplicationUtility applicationUtility, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            MasterUow = masterUow;
            ApplicationUtility = applicationUtility;
            DbContextManager = dbContextManager;
            ValidationMessages = new HashSet<string>();
        }
        public Role Add(Role role)
        {
            role.Status = Status.Active;
            this.MasterUow.RegisterNew<Role>(role);
            this.MasterUow.Commit();
            var applicationModules = this.MasterUow.Repository<vApplicationModule>().All().Where(a=>a.IsRoot== false);
            foreach (var applicationModule in applicationModules)
            {
                RolePermission rolePermission = new RolePermission();
                rolePermission.RoleId = role.RoleId;
                rolePermission.ApplicationModuleId = applicationModule.ApplicationModuleId;
                rolePermission.CanAdd = false;
                rolePermission.CanView = false;
                rolePermission.CanEdit = false;
                rolePermission.CanDelete = false;
                this.MasterUow.RegisterNew<RolePermission>(rolePermission);
            }
            this.MasterUow.Commit();
            return role;
        }

        public HashSet<string> AddValidation(Role role)
        {
            var roleObject = MasterUow.Repository<Role>().SingleOrDefault(t => t.RoleName == role.RoleName && t.Status != Status.Deleted);
            if (roleObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        public void Delete(int id)
        {
            var spParameters = new object[3];
            spParameters[0] = new SqlParameter() { ParameterName = "TableName", Value = "RolePermissions" };
            spParameters[1] = new SqlParameter() { ParameterName = "KeyName", Value = "RoleId" };
            spParameters[2] = new SqlParameter() { ParameterName = "KeyValue", Value = id };
            var result = DbContextManager.SqlQueryAsync<DeleteRecordViewModel>("EXEC dbo.spDeleteRecord @TableName, @KeyName, @KeyValue", spParameters).Result;
            var role = this.MasterUow.Repository<Role>().FindByKey(id);
            role.Status = Status.Deleted;
            this.MasterUow.RegisterDirty<Role>(role);
            this.MasterUow.Commit();
        }

        public HashSet<string> DeleteValidation(int id)
        {
            var isFailed = ApplicationUtility.CandDelete<Role>(id, true);
            if (isFailed)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.CannotBeDeleted, true));
            }
            return ValidationMessages;
        }

        public Role Update(Role role)
        {
            this.MasterUow.RegisterDirty<Role>(role);
            this.MasterUow.Commit();
            return role;
        }

        public HashSet<string> UpdateValidation(Role role)
        {
            var roleObject = MasterUow.Repository<Role>().SingleOrDefault(t => t.RoleName == role.RoleName && t.RoleId != role.RoleId && t.Status != Status.Deleted);
            if (roleObject != null)
            {
                ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.AlreadyExits, true));
            }
            return ValidationMessages;
        }

        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IMasterUow MasterUow { get; set; }

    }

    public interface IRoleDomain
    {
        HashSet<string> AddValidation(Role role);
        HashSet<string> UpdateValidation(Role role);
        HashSet<string> DeleteValidation(int id);
        Role Add(Role role);
        Role Update(Role role);
        void Delete(int id);
    }
}
