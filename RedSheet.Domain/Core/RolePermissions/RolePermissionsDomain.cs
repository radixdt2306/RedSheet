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

namespace RedSheet.Domain.RolePermissions
{
    public class RolePermissionsDomain : IRolePermissionsDomain
    {
        private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
        public RolePermissionsDomain(IMasterUow masterUow, IApplicationUtility applicationUtility, IDbContextManager<MainSqlDbContext> dbContextManager)
        {
            MasterUow = masterUow;
            ApplicationUtility = applicationUtility;
            DbContextManager = dbContextManager;
            ValidationMessages = new HashSet<string>();
        }
        public RolePermission Add(RolePermission rolePermission)
        {
            this.MasterUow.RegisterNew<RolePermission>(rolePermission);
            this.MasterUow.Commit();
            return rolePermission;
        }
        public HashSet<string> AddValidation(RolePermission rolePermission)
        {
            if (!rolePermission.CanView)
            {
                if (rolePermission.CanEdit || rolePermission.CanDelete)
                {
                    ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.RequiredViewPermission, true));
                }
            }
            return ValidationMessages;
        }
       
        public RolePermission Update(RolePermission rolePermission)
        {
            this.MasterUow.RegisterDirty<RolePermission>(rolePermission);
            this.MasterUow.Commit();
            return rolePermission;
        }

        public HashSet<string> UpdateValidation(RolePermission rolePermission)
        {
            if (!rolePermission.CanView)
            {
                if (rolePermission.CanEdit || rolePermission.CanDelete)
                {
                    ValidationMessages.Add(ApplicationUtility.GetValidationMessage(ValidationFailedCode.RequiredViewPermission, true));
                }
            }
            return ValidationMessages;
        }
        private IApplicationUtility ApplicationUtility { get; set; }

        private HashSet<string> ValidationMessages { get; set; }

        private IMasterUow MasterUow { get; set; }

    }

    public interface IRolePermissionsDomain
    {
        HashSet<string> AddValidation(RolePermission RolePermission);
        HashSet<string> UpdateValidation(RolePermission RolePermission);
        RolePermission Add(RolePermission RolePermission);
        RolePermission Update(RolePermission RolePermission);
    }
}
