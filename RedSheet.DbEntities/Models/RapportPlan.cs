
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("RapportPlans", Schema = "dbo")]
	[Serializable]
	public partial class RapportPlan  
	{
 
	[Range(1, int.MaxValue)]
	public int CultureCountryId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int RapportPlanId { get; set; } 
 
	[Required] 
	[MaxLength(500)]
	public string RapportPlanValue { get; set; } 

	public RapportPlan()
	{
    }

    }
}

