
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectPowers", Schema = "dbo")]
	[Serializable]
	public partial class ProjectPower  
	{
 
	[Required] 
	[MaxLength(500)]
	public string PowerDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectPowerId { get; set; } 
 
	[RelationshipTableAttribue("ProjectModules","dbo")]
	//Relationships
	public int ProjectModuleId { get; set; } 
 
	[ForeignKey("ProjectModuleId")]
	public ProjectModule ProjectModule { get; set; } 
	[InverseProperty("ProjectPower")]
	public ICollection<PowerTypeDetail> PowerTypeDetails { get; set; } 

	[InverseProperty("ProjectPower")]
	public ICollection<KnowledgeGatheringPlan> KnowledgeGatheringPlans { get; set; } 


	public ProjectPower()
	{
	this.PowerTypeDetails = new HashSet<PowerTypeDetail>();

	this.KnowledgeGatheringPlans = new HashSet<KnowledgeGatheringPlan>();

    }

    }
}

