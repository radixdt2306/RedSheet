
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("ProjectCulturePlans", Schema = "dbo")]
	[Serializable]
	public partial class ProjectCulturePlan  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectCulturePlanId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string ProjectCulturePlanValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[RelationshipTableAttribue("ApplicationObjects","dbo")]
	public Nullable<CulturePlanCategory> CulturePlanCategoryId { get; set; } 
 
	[RelationshipTableAttribue("CulturePlans","dbo")]
	//Relationships
	public Nullable<int> CulturePlanId { get; set; } 
 
	[ForeignKey("CulturePlanId")]
	public CulturePlan CulturePlan { get; set; } 

	public ProjectCulturePlan()
	{
    }

    }
}

