
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
	[Table("vLiteMeetingManagementRecords", Schema = "dbo")]
	[Serializable]
	public partial class vLiteMeetingManagementRecord  
	{
 
	[Required] 
	[MaxLength(400)]
	public string IntangiblePowerPlan { get; set; } 
 
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
	[Key]
	public int LiteMeetingManagementId { get; set; } 
 
	[Required] 
	[MaxLength(200)]
	public string OpeningStatement { get; set; } 
 
	[Required] 
	[MaxLength(160)]
	public string PreMeetingConditioning { get; set; } 
 
	[Range(1, int.MaxValue)]
	public int ProjectModuleId { get; set; } 

	public vLiteMeetingManagementRecord()
	{
    }

    }
}

