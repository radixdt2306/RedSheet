
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("OurTeamMembers", Schema = "dbo")]
	[Serializable]
	public partial class OurTeamMember  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int OurTeamMemberId { get; set; } 
 
	[RelationshipTableAttribue("ProjectNegotionalities","dbo")]
	//Relationships
	public int ProjectNegotionalityId { get; set; } 
 
	[ForeignKey("ProjectNegotionalityId")]
	public ProjectNegotionality ProjectNegotionality { get; set; } 
 
	[RelationshipTableAttribue("TeamRoles","dbo")]
	//Relationships
	public int TeamRoleId { get; set; } 
 
	[ForeignKey("TeamRoleId")]
	public TeamRole TeamRole { get; set; } 
 
	[RelationshipTableAttribue("Users","dbo")]
	//Relationships
	public int UserId { get; set; } 
 
	[ForeignKey("UserId")]
	public User User { get; set; } 
	[InverseProperty("OurTeamMember")]
	public ICollection<OurTeamMemberRequire> OurTeamMemberRequires { get; set; } 

	[InverseProperty("OurTeamMember")]
	public ICollection<OurTeamMemberBehaviour> OurTeamMemberBehaviours { get; set; } 


	public OurTeamMember()
	{
	this.OurTeamMemberRequires = new HashSet<OurTeamMemberRequire>();

	this.OurTeamMemberBehaviours = new HashSet<OurTeamMemberBehaviour>();

    }

    }
}

