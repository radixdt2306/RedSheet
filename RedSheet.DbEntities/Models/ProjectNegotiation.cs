
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectNegotiations", Schema = "dbo")]
	[Serializable]
	public partial class ProjectNegotiation  
	{
 
	[Required]
	public System.DateTime EventDate { get; set; } 
 
	[Required] 
	[MaxLength(400)]
	public string IntangiblePowerPlan { get; set; } 
 
	[MaxLength(500)]
	public string KnowAboutThem { get; set; } 
 
	[MaxLength(750)]
	public string KnownIssues { get; set; } 
 
	[Required] 
	[MaxLength(50)]
	public string Location { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectNegotiationId { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
	[InverseProperty("ProjectNegotiation")]
	public ICollection<TheirTeamMember> TheirTeamMembers { get; set; } 

	[InverseProperty("ProjectNegotiation")]
	public ICollection<TheirTeamCommunicationMode> TheirTeamCommunicationModes { get; set; } 

	[InverseProperty("ProjectNegotiation")]
	public ICollection<Target> Targets { get; set; } 


	public ProjectNegotiation()
	{
	this.TheirTeamMembers = new HashSet<TheirTeamMember>();

	this.TheirTeamCommunicationModes = new HashSet<TheirTeamCommunicationMode>();

	this.Targets = new HashSet<Target>();

    }

    }
}

