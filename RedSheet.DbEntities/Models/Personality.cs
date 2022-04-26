
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("Personalities", Schema = "dbo")]
	[Serializable]
	public partial class Personality  
	{
 
	[MaxLength(1000)]
	public string Description { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string PersonalityColor { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int PersonalityId { get; set; } 
 
	[MaxLength(50)]
	public string PersonalityKey { get; set; } 
 
	[MaxLength(10)]
	public string PersonalityKeyText { get; set; } 
	[InverseProperty("Personality")]
	public ICollection<TheirTeamMember> TheirTeamMembers { get; set; } 


	public Personality()
	{
	this.TheirTeamMembers = new HashSet<TheirTeamMember>();

    }

    }
}

