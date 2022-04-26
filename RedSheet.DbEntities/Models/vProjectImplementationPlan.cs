
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vProjectImplementationPlans", Schema = "dbo")]
	[Serializable]
	public partial class vProjectImplementationPlan  
	{
 
	[Required] 
	[MaxLength(1000)]
	public string Activity { get; set; } 
 
	[Column(TypeName = "date")]
	public Nullable<System.DateTime> EndDate { get; set; } 
 
	[Required]
	public bool IsEvent { get; set; } 
 
	[Required] 
	[MaxLength(62)]
	public string Name { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int ProjectImplementationPlanId { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 
 
	[Required] 
	[Column(TypeName = "date")]
	public System.DateTime StartDate { get; set; } 

	public vProjectImplementationPlan()
	{
    }

    }
}

