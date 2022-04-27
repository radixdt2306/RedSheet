
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vTeamRoles", Schema = "dbo")]
	[Serializable]
	public partial class vTeamRole  
	{
 
	[MaxLength(1000)]
	public string RoleDescription { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int TeamRoleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TeamRoleName { get; set; } 

	public vTeamRole()
	{
    }

    }
}

