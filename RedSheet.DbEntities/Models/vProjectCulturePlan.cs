
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectCulturePlans", Schema = "dbo")]
	[Serializable]
	public partial class vProjectCulturePlan  
	{

	public Nullable<int> CulturePlanCategoryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public Nullable<int> CulturePlanId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int ProjectCulturePlanId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string ProjectCulturePlanValue { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 

	public vProjectCulturePlan()
	{
    }

    }
}

