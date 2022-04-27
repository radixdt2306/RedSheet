using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedSheet.Models.ViewModels
{
    public class ApplicationModuleViewModel
    {
        [Key]
        public int ApplicationModuleId { get; set; }

        public string ApplicationModuleName { get; set; }

        public int? ParentApplicationModuleId { get; set; }

        public string VisibleActionItem { get; set; }

        public bool IsRolePermissionItem { get; set; }

    }
}
