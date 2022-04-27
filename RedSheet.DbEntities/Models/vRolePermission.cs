
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vRolePermissions", Schema = "dbo")]
	[Serializable]
	public partial class vRolePermission  
	{

	public Nullable<int> Active { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ApplicationModuleId { get; set; } 

	public Nullable<bool> CanAdd { get; set; } 

	public Nullable<bool> CanDelete { get; set; } 

	public Nullable<bool> CanEdit { get; set; } 

	public Nullable<bool> CanView { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int Expr1 { get; set; } 

	public Nullable<bool> IsRolePermissionItem { get; set; } 
 
	[Required]
	public bool IsRoot { get; set; } 
 
	[Required]
	public bool ModuleMasterActive { get; set; } 
 
	[Required] 
	[MaxLength(100)]
	public string ModuleMasterName { get; set; } 

	public Nullable<int> ParentApplicationModuleId { get; set; } 

	public Nullable<int> RoleId { get; set; } 
 
	[MaxLength(50)]
	public string RoleName { get; set; } 

	public Nullable<int> RolePermissionId { get; set; } 
 
	[Required] 
	[MaxLength(1)]
	public string VisibleActionItem { get; set; } 

	public vRolePermission()
	{
    }

    }
}

