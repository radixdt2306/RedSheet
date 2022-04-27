
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("TheirTeamMembers", Schema = "dbo")]
	[Serializable]
	public partial class TheirTeamMember  
	{
 
	[Required] 
	[MaxLength(500)]
	public string Position { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int TheirTeamMemberId { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string TheirTeamMemberName { get; set; } 
 
	[RelationshipTableAttribue("Personalities","dbo")]
	//Relationships
	public int PersonalityId { get; set; } 
 
	[ForeignKey("PersonalityId")]
	public Personality Personality { get; set; } 
 
	[RelationshipTableAttribue("ProjectNegotiations","dbo")]
	//Relationships
	public int ProjectNegotiationId { get; set; } 
 
	[ForeignKey("ProjectNegotiationId")]
	public ProjectNegotiation ProjectNegotiation { get; set; } 

	public TheirTeamMember()
	{
    }

    }
}

