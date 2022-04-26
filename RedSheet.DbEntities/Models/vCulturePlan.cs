
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vCulturePlans", Schema = "dbo")]
	[Serializable]
	public partial class vCulturePlan  
	{
 
	[Range(1, int.MaxValue)]
	public int CulturePlanCategoryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int CulturePlanId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string CulturePlanValue { get; set; } 

	public vCulturePlan()
	{
    }

    }
}

