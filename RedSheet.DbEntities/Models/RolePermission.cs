
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("RolePermissions", Schema = "dbo")]
	[Serializable]
	public partial class RolePermission  
	{
 
	[Required]
	public bool CanAdd { get; set; } 
 
	[Required]
	public bool CanDelete { get; set; } 
 
	[Required]
	public bool CanEdit { get; set; } 
 
	[Required]
	public bool CanView { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int RolePermissionId { get; set; } 
 
	[RelationshipTableAttribue("ApplicationModules","dbo")]
	//Relationships
	public int ApplicationModuleId { get; set; } 
 
	[ForeignKey("ApplicationModuleId")]
	public ApplicationModule ApplicationModule { get; set; } 
 
	[RelationshipTableAttribue("Roles","dbo")]
	//Relationships
	public int RoleId { get; set; } 
 
	[ForeignKey("RoleId")]
	public Role Role { get; set; } 

	public RolePermission()
	{
    }

    }
}

