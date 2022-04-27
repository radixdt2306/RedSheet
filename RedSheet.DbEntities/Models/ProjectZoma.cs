
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectZomas", Schema = "dbo")]
	[Serializable]
	public partial class ProjectZoma  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectZomaId { get; set; } 
 
	[RelationshipTableAttribue("OurRequirementDetails","dbo")]
	//Relationships
	public int OurRequirementDetailId { get; set; } 
 
	[ForeignKey("OurRequirementDetailId")]
	public OurRequirementDetail OurRequirementDetail { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
 
	[RelationshipTableAttribue("TheirRequirementDetails","dbo")]
	//Relationships
	public int TheirRequirementDetailId { get; set; } 
 
	[ForeignKey("TheirRequirementDetailId")]
	public TheirRequirementDetail TheirRequirementDetail { get; set; } 

	public ProjectZoma()
	{
    }

    }
}

