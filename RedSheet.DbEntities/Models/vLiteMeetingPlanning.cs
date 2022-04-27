
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteMeetingPlannings", Schema = "dbo")]
	[Serializable]
	public partial class vLiteMeetingPlanning  
	{
 
	[DatabaseGenerated(DatabaseGeneratedOption.None)] 
	[Key]
	public int LiteMeetingManagementId { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Range(1, int.MaxValue)]
	public int LiteMeetingPlanningId { get; set; } 
 
	[Required] 
	[MaxLength(1000)]
	public string LiteMeetingPlanningValue { get; set; } 

	public vLiteMeetingPlanning()
	{
    }

    }
}

