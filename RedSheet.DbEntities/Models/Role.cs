
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Roles", Schema = "dbo")]
	[Serializable]
	public partial class Role  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int RoleId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string RoleName { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Status Status { get; set; } 
	[InverseProperty("Role")]
	public ICollection<RolePermission> RolePermissions { get; set; } 


	public Role()
	{
	this.RolePermissions = new HashSet<RolePermission>();

    }

    }
}

