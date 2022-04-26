
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("TeamRoles", Schema = "dbo")]
	[Serializable]
	public partial class TeamRole  
	{
 
	[MaxLength(1000)]
	public string RoleDescription { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int TeamRoleId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string TeamRoleName { get; set; } 
	[InverseProperty("TeamRole")]
	public ICollection<OurTeamMember> OurTeamMembers { get; set; } 


	public TeamRole()
	{
	this.OurTeamMembers = new HashSet<OurTeamMember>();

    }

    }
}

