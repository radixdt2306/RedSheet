
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectRequirements", Schema = "dbo")]
	[Serializable]
	public partial class ProjectRequirement  
	{
 
	[Required]
	public bool IsZoma { get; set; } 
 
	[MaxLength(500)]
	public string OurStrategy { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectRequirementId { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public RequirementCategory RequirementCategoryId { get; set; } 
	[InverseProperty("ProjectRequirement")]
	public ICollection<TheirRequirementDetail> TheirRequirementDetails { get; set; } 

	[InverseProperty("ProjectRequirement")]
	public ICollection<OurRequirementDetail> OurRequirementDetails { get; set; } 

	[InverseProperty("ProjectRequirement")]
	public ICollection<TheirBatna> TheirBatnas { get; set; } 

	[InverseProperty("ProjectRequirement")]
	public ICollection<Ourbatna> Ourbatnas { get; set; } 


	public ProjectRequirement()
	{
	this.TheirRequirementDetails = new HashSet<TheirRequirementDetail>();

	this.OurRequirementDetails = new HashSet<OurRequirementDetail>();

	this.TheirBatnas = new HashSet<TheirBatna>();

	this.Ourbatnas = new HashSet<Ourbatna>();

    }

    }
}

