
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteEventPlanningActions", Schema = "dbo")]
	[Serializable]
	public partial class vLiteEventPlanningAction  
	{
 
	[Required] 
	[MaxLength(50)]
	public string LiteEventPlanningActionBy { get; set; } 
 
	[Required] 
	[MaxLength(250)]
	public string LiteEventPlanningActionDetail { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteEventPlanningActionId { get; set; } 
 
	[Required]
	public System.DateTime LiteEventPlanningActionOn { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int LiteMeetingManagementId { get; set; } 

	public vLiteEventPlanningAction()
	{
    }

    }
}

