
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectSuggestedCulturePlans", Schema = "dbo")]
	[Serializable]
	public partial class ProjectSuggestedCulturePlan  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string ProjectCulturePlanValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int ProjectSuggestedCulturePlanId { get; set; } 
 
	[RelationshipTableAttribue("CulturePlans","dbo")]
	//Relationships
	public int CulturePlanId { get; set; } 
 
	[ForeignKey("CulturePlanId")]
	public CulturePlan CulturePlan { get; set; } 

	public ProjectSuggestedCulturePlan()
	{
    }

    }
}

